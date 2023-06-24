import { Dropdown, Row } from 'antd';
import { toast } from 'react-hot-toast';
import React, { useCallback } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import {
  CommentText,
  CommentContainer,
  UserContainer,
  StyledName,
  StyledTime,
  CommentDivider,
  StyledAvatar,
  AvatarText,
  CommentAction,
} from './styles';
import Loader from '../Loader';
import usePost from '../../hooks/usePost';
import useAuth from '../../hooks/useAuth';
import { SafePostUser } from '../../types';
import useFetch from '../../hooks/useFetch';
import { httpMethod } from '../../constants';
import { AvatarContainer } from '../Post/styles';

interface CommentCardProps {
  id: string;
  postId: string;
  comment: string;
  user: SafePostUser;
  timeCreated: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ id, postId, user, comment, timeCreated }) => {
  const navigate = useNavigate();
  const { user: userData } = useAuth();
  const { removeComment } = usePost();
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
          <CommentAction>
            <Dropdown
              placement="bottomLeft"
              menu={{
                items: [
                  {
                    key: `delete=${id}`,
                    label: 'Delete',
                    danger: true,
                    onClick: onDeleteComment,
                  },
                ],
              }}
            >
              <Row>
                <FaEllipsisH />
              </Row>
            </Dropdown>
          </CommentAction>
        )}
      </AvatarContainer>

      <CommentContainer>
        <CommentText>{comment}</CommentText>
      </CommentContainer>
    </>
  );
};

export default CommentCard;
