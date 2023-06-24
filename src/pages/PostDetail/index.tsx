import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Post from '../../components/Post';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';
import usePost from '../../hooks/usePost';
import EmptyState from '../../components/EmptyState';

const PostDetailsPage = () => {
  const params = useParams();
  const { posts, setPosts } = usePost();
  const { isLoading, resData } = useFetch({ endpoint: `/post/${params.id}` });
  const [postData] = posts;

  useEffect(() => {
    if (resData) {
      setPosts([resData.data]);
    }
  }, [resData, setPosts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        {postData ? (
          <Post postData={postData} showComment />
        ) : (
          <EmptyState label="Post not found" />
        )}
      </Col>
    </Row>
  );
};

export default PostDetailsPage;
