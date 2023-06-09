import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import * as api from '../../api';

import getErrorMessage from '../../utils/getErrorMessage';
import useAuth from '../../hooks/useAuth';
import { SafePost } from '../../types';
import Post from '../../components/Post';
import { Typography } from 'antd';

const PostDetailsPage = () => {
  const { token } = useAuth();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<SafePost | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getPost(params.id ?? '', token);

      setPostData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status !== 404) {
        toast.error(getErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, [params.id, token]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {postData ? (
        <Post
          id={postData.id}
          post={postData.post}
          likes={postData.Like}
          comments={postData.Comment}
          user={{ ...postData.User, userId: postData.userId }}
          setPostData={setPostData}
          createdAt={postData.createdAt}
        />
      ) : (
        <Typography.Title>Post not found</Typography.Title>
      )}
    </>
  );
};

export default PostDetailsPage;
