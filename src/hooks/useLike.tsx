import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import * as api from '../api';
import toast from 'react-hot-toast';

import getErrorMessage from '../utils/getErrorMessage';
import { SafeLikePost, SafePost } from '../types';

interface IUseLike {
  likes: SafeLikePost[];
  userId: string | undefined;
  postId: string;
  token: string;
  setPosts: Dispatch<SetStateAction<SafePost[]>>;
}

const useLike = ({ likes, userId, postId, token, setPosts }: IUseLike) => {
  const [isLikeLoading, setLikeLoading] = useState(false);
  const isLiked = !likes.findIndex((like) => like.userId === userId);

  const updateLikeStatus = useCallback(
    (likeData: SafeLikePost) => {
      setPosts((posts) => {
        const postIndex = posts.findIndex((post) => post.id === postId);
        const updatedPost = { ...posts[postIndex] };
        const likeIndex = updatedPost.Like.findIndex((like) => like.userId === userId);

        if (likeIndex > -1) {
          updatedPost.Like.splice(likeIndex, 1);
        } else {
          updatedPost.Like.push(likeData);
        }

        posts[postIndex] = updatedPost;

        return posts;
      });
    },
    [setPosts, postId, userId]
  );

  const toggleLike = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setLikeLoading(true);

      try {
        let request;
        let responseMessage;

        if (isLiked) {
          request = () => api.unlikePost(postId, token);
          responseMessage = 'Disliked post';
        } else {
          request = () => api.likePost(postId, token);
          responseMessage = 'Post liked';
        }

        const response = await request();

        updateLikeStatus(response.data);
        toast.success(responseMessage);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLikeLoading(false);
      }
    },
    [postId, isLiked, token, updateLikeStatus]
  );

  return {
    isLikeLoading,
    isLiked,
    toggleLike,
  };
};

export default useLike;