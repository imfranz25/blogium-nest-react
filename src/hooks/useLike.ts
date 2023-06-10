/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useState } from 'react';
import * as api from '../api';
import toast from 'react-hot-toast';

import getErrorMessage from '../utils/getErrorMessage';
import { SafeError, SafeLikePost, SafePost } from '../types';

interface IUseLike {
  likes: SafeLikePost[];
  userId: string | undefined;
  postId: string;
  token: string | null;
  setPosts?: Dispatch<SetStateAction<SafePost[]>>;
  setPostData?: Dispatch<SetStateAction<SafePost | null>>;
}

const useLike = ({ likes, userId, postId, token, setPosts, setPostData }: IUseLike) => {
  const [isLikeLoading, setLikeLoading] = useState(false);
  const isLiked = likes.findIndex((like) => like.userId === userId) > -1 ? true : false;

  const updateLikeStatus = useCallback(
    (likeData: SafeLikePost) => {
      if (setPosts) {
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
      }

      if (setPostData) {
        setPostData((post: any) => {
          const updatedPost = { ...post };
          const likeIndex = updatedPost.Like.findIndex((like: any) => like.userId === userId);

          if (likeIndex > -1) {
            updatedPost.Like.splice(likeIndex, 1);
          } else {
            updatedPost.Like.push(likeData);
          }

          return updatedPost;
        });
      }
    },
    [setPosts, postId, userId, setPostData]
  );

  const toggleLike: MouseEventHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setLikeLoading(true);

      try {
        let request;
        let responseMessage;

        if (isLiked) {
          request = () => api.unlikePost(postId, token);
          responseMessage = 'Post unliked';
        } else {
          request = () => api.likePost(postId, token);
          responseMessage = 'Post liked';
        }

        const response = await request();

        updateLikeStatus(response.data);
        toast.success(responseMessage);
      } catch (error) {
        toast.error(getErrorMessage(error as SafeError));
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
