import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { Button, Form } from 'antd';

import * as api from '../../api';
import Modal from '../Modal';
import Input from '../Input';
import getErrorMessage from '../../utils/getErrorMessage';
import { SafeError, SafePost } from '../../types';
import { PostDetail } from '../../types/formTypes';

interface PostFormProps {
  addPost: Dispatch<SetStateAction<SafePost[]>>;
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const { token } = useAuth();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePostModal = useCallback(() => {
    setIsModalOpen((state) => !state);
  }, []);

  const onPostSubmit = useCallback(
    async (postDetail: PostDetail) => {
      try {
        setIsLoading(true);
        const { data: newPost } = await api.createPost(postDetail, token);

        addPost((posts) => [...posts, newPost]);
        toast.success('Post created successfully');
        form.resetFields();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(getErrorMessage(error as SafeError));
      } finally {
        setIsLoading(false);
      }
    },
    [addPost, token, form]
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
