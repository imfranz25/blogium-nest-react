import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

import * as api from '../../api';
import Modal from '../Modal';
import Input from '../Input';
import getErrorMessage from '../../utils/getErrorMessage';
import { SafePost } from '../../types';
import { Button } from 'antd';

interface PostFormProps {
  addPost: Dispatch<SetStateAction<SafePost[]>>;
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { post: '' } });

  const togglePostModal = useCallback(() => {
    setIsModalOpen((state) => !state);
  }, []);

  const onPostSubmit = handleSubmit(async (post) => {
    setIsLoading(true);

    try {
      const { data: newPost } = await api.createPost(post, token);

      addPost((posts) => [...posts, newPost]);
      toast.success('Post created successfully');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  });

  const bodyContent = (
    <div>
      <Input
        label="Post"
        id="post"
        register={register}
        errors={errors}
        setValue={setValue}
        required
      />
    </div>
  );

  return (
    <div>
      <Button onClick={togglePostModal}>Create Post</Button>
      <Modal
        isOpen={isModalOpen}
        body={bodyContent}
        onCancel={togglePostModal}
        onSubmit={onPostSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PostForm;
