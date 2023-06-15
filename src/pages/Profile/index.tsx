import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Typography, Card, Button } from 'antd';

import useAuth from '../../hooks/useAuth';
import Post from '../../components/Post';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import { SafeUserProfile } from '../../types';
import { StyledAvatar } from '../../components/Comment/styles';
import { UserContainer } from '../../components/Post/styles';
import { useEffect } from 'react';
import usePost from '../../hooks/usePost';

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setPosts, posts } = usePost();

  /* Profile Details */
  const { isLoading, resData } = useFetch({ endpoint: `/user/${params.id}` });
  const userData: SafeUserProfile = resData?.data;
  const isOwnProfile = user?.userId === params.id;

  useEffect(() => {
    if (resData) setPosts(resData.data?.Post ?? []);
  }, [resData, setPosts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row justify="space-around">
      <Col span={16}>
        {userData ? (
          <>
            <Row>
              <Col span={16}>
                <Row align="middle">
                  <StyledAvatar src={userData.profilePicture} size={100}>
                    <span style={{ fontSize: '35px' }}>{userData.firstName[0].toUpperCase()}</span>
                  </StyledAvatar>
                  <UserContainer style={{ marginLeft: '25px' }}>
                    <Typography.Title level={3}>
                      {userData.firstName} {userData.lastName}
                    </Typography.Title>
                    <Typography.Text>{format(new Date(userData.birthday), 'PP')}</Typography.Text>
                    <Typography.Paragraph>
                      {userData.bio ? `"${userData.bio}"` : 'No bio'}
                    </Typography.Paragraph>
                  </UserContainer>
                </Row>
              </Col>

              {isOwnProfile && (
                <Col span={4} offset={4} style={{ display: 'flex', alignItems: 'center' }}>
                  <Button type="primary" onClick={() => navigate(`/edit-profile`)}>
                    Edit Profile
                  </Button>
                </Col>
              )}
            </Row>

            {posts.length > 0 && (
              <>
                <Typography.Title level={2}>Posts</Typography.Title>
                {posts.map((post) => (
                  <Post key={post.id} postData={post} />
                ))}
              </>
            )}
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
