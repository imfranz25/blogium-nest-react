import { useCallback, useMemo } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { Button, Dropdown, Row, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import usePost from '../../hooks/usePost';
import postItems from '../../utils/getPostMenu';
import usePostModal from '../../hooks/usePostModal';
import { SafePost, SafePostUser } from '../../types';
import useDeleteModal from '../../hooks/useDeleteModal';
import { AvatarContainer, UserContainer, Avatar } from './styles';

interface PostAvatarProps {
  postData: SafePost;
  timeCreated: string;
  userId: string | undefined;
  postOwner: SafePostUser;
}

const PostAvatar: React.FC<PostAvatarProps> = ({ postData, postOwner, userId, timeCreated }) => {
  const { setPost } = usePost();
  const deleteModal = useDeleteModal();
  const postModal = usePostModal();
  const navigate = useNavigate();
  const location = useLocation();

  const viewUser = useCallback(() => {
    navigate(`/profile/${postData.userId}`);
  }, [navigate, postData.userId]);

  const setPostState = useCallback(
    (state: 'edit' | 'delete') => {
      setPost(postData);

      if (state === 'edit') postModal.onOpen(true); // set to edit mode
      if (state === 'delete') deleteModal.onOpen(); // set to delete mode
    },
    [setPost, postData, postModal, deleteModal]
  );

  /* Post Options (View, Edit, Delete) */
  const menuItems = useMemo(() => {
    const isOwnPost = userId === postData.userId;
    const menuList = postItems(postData.id, isOwnPost, location.pathname, setPostState);

    return menuList;
  }, [postData, userId, location.pathname, setPostState]);

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
