import { Form } from 'antd';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { IoSend } from 'react-icons/io5';

import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { CommentButton, Divider } from '../Post/styles';
import { httpMethod } from '../../constants';
import { CommentDetail } from '../../types/formTypes';
import { requiredField } from '../../utils/inputValidators';

interface CommentProps {
  postId: string;
}

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const { addComment } = usePost();
  const [form] = Form.useForm();

  const { isLoading, refetch: createComment } = useFetch({
    endpoint: `/post/comment/${postId}`,
    skipInitialInvocation: true,
  });

  const onSubmitComment = useCallback(
    async (comment: CommentDetail) => {
      const resData = await createComment({ method: httpMethod.POST, data: comment });

      if (!resData) {
        return;
      }

      addComment(postId, resData.data);
      form.resetFields();
      toast.success('Comment successfully added');
    },
    [addComment, createComment, postId, form]
  );

  return (
    <>
      <Divider />
      <Form onFinish={onSubmitComment} form={form}>
        <Input
          id="comment"
          label="Comment"
          placeholder="Write a comment..."
          disabled={isLoading}
          rules={requiredField('Comment')}
          suffix={
            <CommentButton loading={isLoading} htmlType="submit" type="link" icon={<IoSend />} />
          }
        />
      </Form>
    </>
  );
};

export default Comment;
