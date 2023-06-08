import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';
import toast from 'react-hot-toast';

import * as api from '../../api';
import Input from '../Input';
import { CommentButton, Divider } from './styles';
import { SafePost } from '../../types';
import getErrorMessage from '../../utils/getErrorMessage';
import { SafePostComment } from '../../types';
import { Form } from 'antd';

interface CommentProps {
  token: string;
  postId: string;
  comments: SafePostComment[];
  setPosts?: Dispatch<SetStateAction<SafePost[]>>;
  setPostData?: Dispatch<SetStateAction<SafePost | null>>;
}

const Comment: React.FC<CommentProps> = ({ token, postId, setPosts, setPostData, comments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { comment: '' } });

  const onSubmitComment = useCallback(
    async (comment: FieldValues) => {
      try {
        setIsLoading(true);
        const response = await api.addComment(postId, comment, token);

        if (setPosts) {
          setPosts((posts) => {
            const postIndex = posts.findIndex((post) => post.id === postId);
            const updatedPost = { ...posts[postIndex] };

            updatedPost.Comment.push(response.data);
            posts[postIndex] = updatedPost;

            return posts;
          });
        }

        if (setPostData) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setPostData((post: any) => {
            const updatedPost = { ...post };

            updatedPost?.Comment?.push(response.data);

            return updatedPost;
          });
        }

        toast.success('Comment successfully added');
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [postId, setPostData, setPosts, token]
  );

  return (
    <>
      <Divider />
      <Form onFinish={handleSubmit(onSubmitComment)}>
        <Input
          required
          id="comment"
          label="Comment"
          errors={errors}
          setValue={setValue}
          placeholder="Write a comment..."
          suffix={
            <CommentButton loading={isLoading} htmlType="submit" type="link" icon={<IoSend />} />
          }
        />
      </Form>
      <div>
        Comments:
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comment;
