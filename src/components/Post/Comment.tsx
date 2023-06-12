import { Form } from 'antd';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { IoSend } from 'react-icons/io5';

import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { SafePostComment } from '../../types';
import { CommentButton, Divider } from './styles';
import { httpMethod } from '../../constants';
import { CommentDetail } from '../../types/formTypes';

interface CommentProps {
  postId: string;
  comments: SafePostComment[];
}

const Comment: React.FC<CommentProps> = ({ postId, comments }) => {
  const { addComment } = usePost();
  const [form] = Form.useForm();

  const { isLoading, refetch: createComment } = useFetch({
    endpoint: `/post/comment/${postId}`,
    skipInitialInvocation: true,
  });

  const onSubmitComment = useCallback(
    async (comment: CommentDetail) => {
      const resData = await createComment({ method: httpMethod.POST, data: comment });

      if (resData) {
        addComment(postId, resData.data);
        form.resetFields();
        toast.success('Comment successfully added');
      }
    },
    [addComment, createComment, postId, form]
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
