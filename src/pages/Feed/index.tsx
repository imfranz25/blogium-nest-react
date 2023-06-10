import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Col, Row } from 'antd';

import * as api from '../../api';
import getErrorMessage from '../../utils/getErrorMessage';
import { SafeError, SafePost } from '../../types';
import Post from '../../components/Post';
import PostForm from '../../components/Post/PostForm';
import Loader from '../../components/Loader';
import useAuth from '../../hooks/useAuth';

const FeedPage = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<SafePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getAllPosts(token);

      setPosts(response?.data || []);
    } catch (error) {
      toast.error(getErrorMessage(error as SafeError));
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        <PostForm addPost={setPosts} />
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            post={post.post}
            user={{ ...post.User, userId: post.userId }}
            likes={post.Like}
            comments={post.Comment}
            setPosts={setPosts}
            createdAt={post.createdAt}
          />
        ))}
      </Col>
    </Row>
  );
};

export default FeedPage;
