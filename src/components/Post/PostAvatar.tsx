import { useCallback, useMemo } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { Button, Dropdown, Row, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { SafePostUser } from '../../types';
import postItems from '../../utils/getPostMenu';
import { AvatarContainer, UserContainer, Avatar } from './styles';

interface PostAvatarProps {
  postId: string;
  timeCreated: string;
  userId: string | undefined;
  postOwner: SafePostUser;
}

const PostAvatar: React.FC<PostAvatarProps> = ({ postId, postOwner, userId, timeCreated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const viewUser = useCallback(() => {
    navigate(`/profile/${postOwner.userId}`);
  }, [navigate, postOwner.userId]);

  /* Post Options (View, Edit, Delete) */
  const menuItems = useMemo(() => {
    const isOwnPost = userId === postOwner.userId;
    const menuList = postItems(postId, isOwnPost, location.pathname);

    return menuList;
  }, [postId, userId, postOwner.userId, location.pathname]);

  return (
    <Row justify="space-between">
      <AvatarContainer onClick={viewUser}>
        <Avatar src={postOwner.profilePicture} size={40}>
          {postOwner.firstName[0].toUpperCase()}
        </Avatar>
        <UserContainer>
          <Typography.Text>{`${postOwner.firstName} ${postOwner.lastName}`}</Typography.Text>
          <Typography.Paragraph>{timeCreated}</Typography.Paragraph>
        </UserContainer>
      </AvatarContainer>
      {menuItems.length > 0 && (
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <Button type="text">
            <FaEllipsisH />
          </Button>
        </Dropdown>
      )}
    </Row>
  );
};

export default PostAvatar;
