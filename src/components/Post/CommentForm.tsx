import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { Form } from 'antd';

import * as api from '../../api';
import Input from '../Input';
import { CommentButton, Divider } from './styles';
import { SafeError, SafePost } from '../../types';
import getErrorMessage from '../../utils/getErrorMessage';
import { SafePostComment } from '../../types';
import { CommentDetail } from '../../types/formTypes';

interface CommentProps {
  token: string;
  postId: string;
  comments: SafePostComment[];
  setPosts?: Dispatch<SetStateAction<SafePost[]>>;
  setPostData?: Dispatch<SetStateAction<SafePost | null>>;
}

const Comment: React.FC<CommentProps> = ({ token, postId, setPosts, setPostData, comments }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitComment = useCallback(
    async (comment: CommentDetail) => {
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

        form.resetFields();
        toast.success('Comment successfully added');
      } catch (error) {
        toast.error(getErrorMessage(error as SafeError));
      } finally {
        setIsLoading(false);
      }
    },
    [postId, setPostData, setPosts, token, form]
  );

  return (
    <>
      <Divider />
      <Form onFinish={onSubmitComment} form={form}>
        <Input
          required
          id="comment"
          label="Comment"
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
