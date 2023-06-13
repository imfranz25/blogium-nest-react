import { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import Post from '../../components/Post';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';
import usePost from '../../hooks/usePost';

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
          <Post
            postData={{ ...postData, User: { ...postData.User, userId: postData.userId } }}
            // id={postData.id}
            // post={postData.post}
            // likes={postData.Like}
            // comments={postData.Comment}
            // postOwner={{ ...postData.User, userId: postData.userId }}
            // createdAt={postData.createdAt}
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
