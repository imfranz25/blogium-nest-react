import { format } from 'date-fns';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Typography, Button } from 'antd';

import Post from '../../components/Post';
import useAuth from '../../hooks/useAuth';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import { SafeUserProfile } from '../../types';
import PostHeader from '../../components/PostHeader';
import EmptyState from '../../components/EmptyState';
import { StyledAvatar } from '../../components/Comment/styles';
import { ProfileContainer, NameLogo, UserContainer, EditContainer, UserRow } from './styles';
import { Divider } from '../../components/Post/styles';

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
            <div style={{ marginBottom: '20px' }}>
              <PostHeader label="Profile" isOWnProfile={isOwnProfile} />
            </div>
            <ProfileContainer>
              <Col sm={20} md={16}>
                <UserRow align="middle">
                  <StyledAvatar src={userData.profilePicture} size={100}>
                    <NameLogo>{userData.firstName[0].toUpperCase()}</NameLogo>
                  </StyledAvatar>
                  <UserContainer>
                    <Typography.Title level={3}>
                      {userData.firstName} {userData.lastName}
                    </Typography.Title>
                    <Typography.Text>{format(new Date(userData.birthday), 'PP')}</Typography.Text>
                    <Typography.Paragraph>
                      {userData.bio ? `"${userData.bio}"` : 'No bio'}
                    </Typography.Paragraph>
                  </UserContainer>
                </UserRow>
              </Col>

              {isOwnProfile && (
                <EditContainer xs={24} sm={24} md={{ offset: 4, span: 4 }}>
                  <Button type="primary" onClick={() => navigate(`/edit-profile`)}>
                    Edit Profile
                  </Button>
                </EditContainer>
              )}
            </ProfileContainer>

            {posts.length > 0 ? (
              <>
                <Typography.Title level={2}>Posts</Typography.Title>
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
          </>
        ) : (
          <EmptyState label="User not found" />
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
