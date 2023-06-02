import { useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';
import * as api from '../../api';
import getErrorMessage from '../../utils/getErrorMessage';
import { toast } from 'react-hot-toast';

const PostForm = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { post: '' } });

  const togglePostModal = useCallback(() => {
    setIsModalOpen((state) => !state);
  }, []);

  const onPostSubmit = handleSubmit(async (post) => {
    setIsLoading(true);

    try {
      await api.createPost(post, token);
      toast.success('Post created successfully');
      setIsModalOpen((state) => !state);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }

    setIsLoading(false);
  });

  const bodyContent = (
    <div>
      <Input label="Post" id="post" register={register} errors={errors} required />
      <Button label="Submit" onClick={onPostSubmit} />
    </div>
  );

  return (
    <div>
      <Button label="Create Post" onClick={togglePostModal} />
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
