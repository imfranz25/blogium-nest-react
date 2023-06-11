import { Col, Row } from 'antd';

import Post from '../../components/Post';
import PostForm from '../../components/Post/PostForm';
import Loader from '../../components/Loader';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';

const FeedPage = () => {
  const { isLoading, resData } = useFetch({ endpoint: '/post' });
  const { posts, setPosts } = usePost();

  useEffect(() => {
    if (resData) {
      setPosts(resData.data);
    }
  }, [setPosts, resData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        <PostForm />
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            post={post.post}
            postOwner={{ ...post.User, userId: post.userId }}
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
