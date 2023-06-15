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
      </AvatarContainer>

      <CommentContainer>
        <CommentText>{comment}</CommentText>
      </CommentContainer>
    </>
  );
};

export default CommentCard;
