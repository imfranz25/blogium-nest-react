import * as api from '../../api';
import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Dropdown, Button } from 'antd';

import { SafePostUser, SafePostComment, SafePost, SafeLikePost } from '../../types';
import Input from '../Input';
import useAuth from '../../hooks/useAuth';
import getErrorMessage from '../../utils/getErrorMessage';
import useLike from '../../hooks/useLike';
import { FaEllipsisH } from 'react-icons/fa';
import postItems from '../../utils/getPostMenu';

interface PostProps {
  id: string;
  post: string;
  user: SafePostUser;
  likes: SafeLikePost[];
  comments: SafePostComment[];
  setPosts?: Dispatch<SetStateAction<SafePost[]>>;
  setPostData?: Dispatch<SetStateAction<SafePost | null>>;
}

const Post: React.FC<PostProps> = ({ id, post, user, likes, comments, setPosts, setPostData }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token, user: userData } = useAuth();
  const { isLiked, isLikeLoading, toggleLike } = useLike({
    likes,
    token,
    userId: userData?.userId,
    postId: id,
    setPosts,
    setPostData,
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { comment: '' } });

  const menuItems = useMemo(() => {
    const isOwnPost = userData?.userId === user.userId;
    const menuList = postItems(id, isOwnPost, location.pathname);

    return menuList;
  }, [id, userData?.userId, user.userId, location.pathname]);

  const onSubmitComment = useCallback(
    async (comment: FieldValues) => {
      try {
        setIsLoading(true);
        const response = await api.addComment(id, comment, token);

        if (setPosts) {
          setPosts((posts) => {
            const postIndex = posts.findIndex((post) => post.id === id);
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

        toast.success('Comment successfully added');
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        reset();
        setIsLoading(false);
      }
    },
    [id, reset, setPostData, setPosts, token]
  );

  const viewUser = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      navigate(`/profile/${user.userId}`);
    },
    [navigate, user.userId]
  );

  return (
    <>
      <hr />
      <div>
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <Button>
            <FaEllipsisH />
          </Button>
        </Dropdown>
        <p> {post}</p>
        <Button disabled={isLikeLoading} onClick={toggleLike}>
          {isLiked ? 'Liked' : 'Like'}: {likes.length}
        </Button>
        <div onClick={viewUser}>user: {`${user.firstName} ${user.lastName}`}</div>
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
        <Input
          label="Add comment"
          id="comment"
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <Button onClick={handleSubmit(onSubmitComment)} loading={isLoading}>
          Save
        </Button>
      </div>
      <hr />
    </>
  );
};

export default Post;
