import { useEffect } from 'react';
import { Button, Col, Row } from 'antd';

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
        <Button onClick={() => postModal.onOpen()}>Create Post</Button>
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </Col>
    </Row>
  );
};

export default FeedPage;
