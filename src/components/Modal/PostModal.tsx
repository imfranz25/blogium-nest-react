import { Form } from 'antd';
import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

import Modal from '.';
import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { PostDetail } from '../../types/formTypes';
import usePostModal from '../../hooks/usePostModal';

const PostForm = () => {
  const { addPost } = usePost();
  const [form] = Form.useForm();
  const postModal = usePostModal();

  const { refetch: createPost, isLoading } = useFetch({
    endpoint: '/post',
    skipInitialInvocation: true,
  });

  const onPostSubmit = useCallback(
    async (postDetail: PostDetail) => {
      const resData = await createPost({ method: httpMethod.POST, data: postDetail });

      if (resData) {
        addPost(resData.data);
        toast.success('Post created successfully');
        form.resetFields();
        postModal.onClose();
      }
    },
    [form, createPost, addPost, postModal]
  );

  return (
    <>
      <Modal
        isOpen={postModal.isOpen}
        onCancel={postModal.onClose}
        isLoading={isLoading}
        closable={false}
        onOk={form.submit}
      >
        <Form onFinish={onPostSubmit} form={form}>
          <Input type="textarea" label="Post" id="post" required />
        </Form>
      </Modal>
    </>
  );
};

export default PostForm;
