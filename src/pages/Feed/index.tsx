import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Col, Row } from 'antd';
import { BounceLoader } from 'react-spinners';

import * as api from '../../api';
import getErrorMessage from '../../utils/getErrorMessage';
import useAuth from '../../hooks/useAuth';
import { SafePost } from '../../types';
import Post from '../../components/Post';
import PostForm from '../../components/Post/PostForm';
import Loader from '../../components/Loader';

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
      toast.error(getErrorMessage(error));
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
