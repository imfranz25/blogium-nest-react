import { Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';

const ProfilePage = () => {
  const params = useParams();
  const { isLoading, resData } = useFetch({ endpoint: `/user/${params.id}` });
  const userData = resData?.data;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        {userData ? (
          <>
            <div>Profile Picture: {userData?.profilePicture}</div>
            <div>Name: {userData?.firstName}</div>
          </>
        ) : (
          <Row justify="center">
            <Typography.Title>User not found</Typography.Title>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
