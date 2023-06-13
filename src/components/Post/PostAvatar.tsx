import { useCallback, useMemo } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { Button, Dropdown, Row, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { SafePost, SafePostUser } from '../../types';
import postItems from '../../utils/getPostMenu';
import { AvatarContainer, UserContainer, Avatar } from './styles';
import usePost from '../../hooks/usePost';
import usePostModal from '../../hooks/usePostModal';

interface PostAvatarProps {
  postData: SafePost;
  timeCreated: string;
  userId: string | undefined;
  postOwner: SafePostUser;
}

const PostAvatar: React.FC<PostAvatarProps> = ({ postData, postOwner, userId, timeCreated }) => {
  const { setPost } = usePost();
  const postModal = usePostModal();
  const navigate = useNavigate();
  const location = useLocation();

  const viewUser = useCallback(() => {
    navigate(`/profile/${postData.userId}`);
  }, [navigate, postData.userId]);

  const setPostEdit = useCallback(() => {
    setPost(postData);
    postModal.onOpen(true);
  }, [setPost, postData, postModal]);

  /* Post Options (View, Edit, Delete) */
  const menuItems = useMemo(() => {
    const isOwnPost = userId === postData.userId;
    const menuList = postItems(postData.id, isOwnPost, location.pathname, setPostEdit);

    return menuList;
  }, [postData, userId, location.pathname, setPostEdit]);

  return (
    <Row justify="space-between">
      <AvatarContainer onClick={viewUser}>
        <Avatar src={postOwner.profilePicture} size={40}>
          {postOwner?.firstName[0]?.toUpperCase()}
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
