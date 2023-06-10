import { Col, Row } from 'antd';

import * as api from '../../api';
import { SafeError, SafePost } from '../../types';
import Post from '../../components/Post';
import PostForm from '../../components/Post/PostForm';
import Loader from '../../components/Loader';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';

const FeedPage = () => {
  const { isLoading, resData } = useFetch({ endpoint: '/post' });
  const posts: SafePost[] = resData?.data ?? [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        {/* <PostForm addPost={setPosts} /> */}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            post={post.post}
            user={{ ...post.User, userId: post.userId }}
            likes={post.Like}
            comments={post.Comment}
            // setPosts={setPosts}
            createdAt={post.createdAt}
          />
        ))}
      </Col>
    </Row>
  );
};

export default FeedPage;
