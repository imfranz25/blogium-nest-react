import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

import * as api from '../../api';
import Modal from '../Modal';
import Input from '../Input';
import getErrorMessage from '../../utils/getErrorMessage';
import { SafePost } from '../../types';
import { Button, Form } from 'antd';

interface PostFormProps {
  addPost: Dispatch<SetStateAction<SafePost[]>>;
}

interface FormPostProps {
  post: string;
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
    async (post: FormPostProps) => {
      try {
        setIsLoading(true);
        const { data: newPost } = await api.createPost(post, token);

        addPost((posts) => [...posts, newPost]);
        toast.success('Post created successfully');
        form.resetFields();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
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
