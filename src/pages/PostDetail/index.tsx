import { Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import Post from '../../components/Post';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';

const PostDetailsPage = () => {
  const params = useParams();
  const { isLoading, resData } = useFetch({ endpoint: `/post/${params.id}` });
  const postData = resData?.data;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        {postData ? (
          <Post
            id={postData.id}
            post={postData.post}
            likes={postData.Like}
            comments={postData.Comment}
            postOwner={{ ...postData.User, userId: postData.userId }}
            createdAt={postData.createdAt}
          />
        ) : (
          <Row justify="center">
            <Typography.Title>Post not found</Typography.Title>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default PostDetailsPage;
