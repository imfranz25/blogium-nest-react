import { useEffect } from 'react';
import { Col, Row } from 'antd';

import Post from '../../components/Post';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import PostHeader from '../../components/PostHeader';

const FeedPage = () => {
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
        <PostHeader label="Feed" />
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </Col>
    </Row>
  );
};

export default FeedPage;
