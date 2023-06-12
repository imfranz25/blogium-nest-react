import { Button, Form } from 'antd';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';

import Modal from '../Modal';
import Input from '../Input';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { PostDetail } from '../../types/formTypes';

const PostForm = () => {
  const { addPost } = usePost();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refetch: createPost, isLoading } = useFetch({
    endpoint: '/post',
    skipInitialInvocation: true,
  });

  const togglePostModal = useCallback(() => {
    setIsModalOpen((state) => !state);
  }, []);

  const onPostSubmit = useCallback(
    async (postDetail: PostDetail) => {
      const resData = await createPost({ method: httpMethod.POST, data: postDetail });

      if (resData) {
        addPost(resData.data);
        toast.success('Post created successfully');
        form.resetFields();
        setIsModalOpen(false);
      }
    },
    [form, createPost, addPost]
  );

  return (
    <>
      <Button onClick={togglePostModal}>Create Post</Button>
      <Modal
        isOpen={isModalOpen}
        onCancel={togglePostModal}
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
