import * as api from '../../api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { SafePostUser, SafePostComment } from '../../types';
import Input from '../Input';
import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import getErrorMessage from '../../utils/getErrorMessage';

interface PostProps {
  id: string;
  post: string;
  user: SafePostUser;
  likes: string[];
  comments: SafePostComment[];
}

const Post: React.FC<PostProps> = ({ id, post, user, likes, comments }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { comment: '' } });

  const onSubmitComment = handleSubmit(async (comment) => {
    setIsLoading(true);

    try {
      const response = await api.addComment(id, comment, token);

      console.log(response.data);

      toast.success('Comment successfully added');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      reset();
      setIsLoading(false);
    }
  });

  return (
    <>
      <div onClick={() => navigate(`/post/${id}`)}>
        {post}
        <div>Likes: {likes.length}</div>
        <div
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/profile/${user.userId}`);
          }}
        >
          user: {`${user.firstName} ${user.lastName}`}
        </div>
      </div>
      <div>
        Comments:
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
      <div>
        <Input label="Add comment" id="comment" register={register} errors={errors} />
        <Button label="Save" onClick={onSubmitComment} disabled={isLoading} />
      </div>
      <hr />
    </>
  );
};

export default Post;
