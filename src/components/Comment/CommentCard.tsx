import React, { useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { SafePostUser } from '../../types';
import { AvatarContainer } from '../Post/styles';
import {
  CommentText,
  CommentContainer,
  UserContainer,
  StyledName,
  StyledTime,
  CommentDivider,
  StyledAvatar,
  AvatarText,
} from './styles';
import { Dropdown, Row } from 'antd';
import useAuth from '../../hooks/useAuth';
import { FaEllipsisH } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { toast } from 'react-hot-toast';
import usePost from '../../hooks/usePost';
import Loader from '../Loader';

interface CommentCardProps {
  id: string;
  postId: string;
  user: SafePostUser;
  comment: string;
  timeCreated: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ id, postId, user, comment, timeCreated }) => {
  const { user: userData } = useAuth();
  const { removeComment } = usePost();
  const navigate = useNavigate();
  const isOwnComment = userData?.userId === user.id;

  const { refetch: deleteComment, isLoading } = useFetch({
    endpoint: `/post/comment/${id}`,
    skipInitialInvocation: true,
  });

  const viewUser = useCallback(() => {
    navigate(`/profile/${user.id}`);
  }, [navigate, user.id]);

  const onDeleteComment = useCallback(async () => {
    const response = await deleteComment({ method: httpMethod.DELETE });

    if (response?.status === 200) {
      removeComment(postId, id);
      toast.success('Comment deleted');
    }
  }, [deleteComment, removeComment, id, postId]);

  if (isLoading) {
    return <Loader size={50} />;
  }

  return (
    <>
      <CommentDivider />

      <AvatarContainer>
        <StyledAvatar src={user.profilePicture} size={25} onClick={viewUser}>
          <AvatarText>{user.firstName[0].toUpperCase()}</AvatarText>
        </StyledAvatar>

        <UserContainer onClick={viewUser}>
          <StyledName>
            {user.firstName} {user.lastName}
          </StyledName>
          &#8226;
          <StyledTime>{formatDistanceToNow(new Date(timeCreated))}</StyledTime>
        </UserContainer>

        {isOwnComment && (
          <Dropdown
            menu={{
              items: [
                { key: `delete=${id}`, label: 'Delete', danger: true, onClick: onDeleteComment },
              ],
            }}
            placement="bottomLeft"
          >
            <Row>
              <FaEllipsisH />
            </Row>
          </Dropdown>
        )}
      </AvatarContainer>

      <CommentContainer>
        <CommentText>{comment}</CommentText>
      </CommentContainer>
    </>
  );
};

export default CommentCard;
