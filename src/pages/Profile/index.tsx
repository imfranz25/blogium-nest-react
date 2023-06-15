import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Typography, Card, Button } from 'antd';

import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import { SafeUserProfile } from '../../types';
import { StyledAvatar } from '../../components/Comment/styles';
import { UserContainer } from '../../components/Post/styles';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  /* Profile Details */
  const { isLoading, resData } = useFetch({ endpoint: `/user/${params.id}` });
  const userData: SafeUserProfile = resData?.data;
  const isOwnProfile = user?.userId === params.id;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        {userData ? (
          <Card>
            <StyledAvatar src={userData.profilePicture} size={100}>
              <span style={{ fontSize: '35px' }}>{userData.firstName[0].toUpperCase()}</span>
            </StyledAvatar>
            <UserContainer>
              <Typography.Title level={3}>
                {userData.firstName} {userData.lastName}
              </Typography.Title>
              <Typography.Text>{format(new Date(userData.birthday), 'PP')}</Typography.Text>
            </UserContainer>
            {isOwnProfile && (
              <Button onClick={() => navigate(`/edit-profile`)}>Edit Profile</Button>
            )}
          </Card>
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
