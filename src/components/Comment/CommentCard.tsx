import React, { useCallback } from 'react';
import Avatar from 'antd/es/avatar/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';

import { SafePostUser } from '../../types';
import { AvatarContainer } from '../Post/styles';
import { CommentText, CommentContainer, UserContainer, StyledName, StyledTime } from './styles';

interface CommentCardProps {
  user: SafePostUser;
  comment: string;
  timeCreated: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ user, comment, timeCreated }) => {
  const navigate = useNavigate();

  const viewUser = useCallback(() => {
    navigate(`/profile/${user.id}`);
  }, [navigate, user.id]);

  return (
    <>
      <Divider style={{ padding: 0, margin: '0 0 15px 0' }} />
      <AvatarContainer>
        <Avatar
          src={user.profilePicture}
          size={25}
          onClick={viewUser}
          style={{ backgroundColor: '#87ceeb' }}
        >
          <span style={{ padding: '8px' }}>{user.firstName[0].toUpperCase()}</span>
        </Avatar>
        <UserContainer onClick={viewUser}>
          <StyledName>
            {user.firstName} {user.lastName}
          </StyledName>
          <StyledTime>{formatDistanceToNow(new Date(timeCreated))}</StyledTime>
        </UserContainer>
      </AvatarContainer>
      <CommentContainer>
        <CommentText>{comment}</CommentText>
      </CommentContainer>
    </>
  );
};

export default CommentCard;
