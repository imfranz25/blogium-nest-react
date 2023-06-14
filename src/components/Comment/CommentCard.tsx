import React, { useCallback } from 'react';
import Avatar from 'antd/es/avatar/avatar';
import { formatDistanceToNow } from 'date-fns';

import { SafePostUser } from '../../types';
import { AvatarContainer, UserContainer } from '../Post/styles';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <AvatarContainer onClick={viewUser}>
        <Avatar src={user.profilePicture} size={25}>
          <span style={{ padding: '5px' }}>{user.firstName[0].toUpperCase()}</span>
        </Avatar>
        <div
          style={{
            display: 'flex !important',
            alignItems: 'center !important',
            marginLeft: '5px',
          }}
        >
          <span style={{ fontSize: '15px' }}>
            {user.firstName} {user.lastName}
          </span>
          <span style={{ fontSize: '12px', color: 'gray', marginLeft: '5px' }}>
            {formatDistanceToNow(new Date(timeCreated))}
          </span>
        </div>
      </AvatarContainer>
      <Typography.Paragraph style={{ marginLeft: '30px' }}> {comment}</Typography.Paragraph>
    </div>
  );
};

export default CommentCard;
