import { useEffect } from 'react';
import { Button, Col, Row, Typography } from 'antd';

import Post from '../../components/Post';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import usePostModal from '../../hooks/usePostModal';

const FeedPage = () => {
  const postModal = usePostModal();
  const { posts, setPosts } = usePost();
  const { isLoading, resData } = useFetch({ endpoint: '/post' });

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
        <Row justify="space-between" align="middle">
          <Typography.Title level={2} style={{ margin: 0 }}>
            Feed
          </Typography.Title>
          <Button onClick={() => postModal.onOpen()} type="primary">
            Create Post
          </Button>
        </Row>
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </Col>
    </Row>
  );
};

export default FeedPage;
