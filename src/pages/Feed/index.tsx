import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

import * as api from '../../api';
import PostForm from '../../components/PostForm';
import getErrorMessage from '../../utils/getErrorMessage';
import useAuth from '../../hooks/useAuth';
import { SafePost } from '../../types';

const FeedPage = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<SafePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getAllPost(token);

      setPosts(response?.data || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <PostForm />
      {isLoading && <p>Loading...</p>}
      {posts.map((post) => (
        <p key={post.id}>{post.post}</p>
      ))}
    </div>
  );
};

export default FeedPage;
