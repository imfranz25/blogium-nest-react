import { useEffect } from 'react';
import { Col, Row } from 'antd';

import Post from '../../components/Post';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import PostHeader from '../../components/PostHeader';
import EmptyState from '../../components/EmptyState';
import { Divider } from '../../components/Post/styles';

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
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Post key={post.id} postData={post} />
            ))}
          </>
        ) : (
          <>
            <Divider />
            <EmptyState label="No posts found" />
          </>
        )}
      </Col>
    </Row>
  );
};

export default FeedPage;
