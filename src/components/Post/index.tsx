import { FaEllipsisH } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown, Button, Row, Typography } from 'antd';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import Comment from './CommentForm';
import useLike from '../../hooks/useLike';
import postItems from '../../utils/getPostMenu';
import { SafePostUser, SafePostComment, SafePost, SafeLikePost } from '../../types';
import {
  AvatarContainer,
  PostCard,
  UserContainer,
  Avatar,
  Paragraph,
  PostButton,
  Divider,
} from './styles';
import useAuth from '../../hooks/useAuth';

interface PostProps {
  id: string;
  post: string;
  createdAt: string;
  user: SafePostUser;
  likes: SafeLikePost[];
  comments: SafePostComment[];
  setPosts?: Dispatch<SetStateAction<SafePost[]>>;
  setPostData?: Dispatch<SetStateAction<SafePost | null>>;
}

const Post: React.FC<PostProps> = ({
  id,
  post,
  user,
  createdAt,
  likes,
  comments,
  setPosts,
  setPostData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isShowComment, setShowComment] = useState(false);
  const { token, user: userData } = useAuth();
  const { isLiked, isLikeLoading, toggleLike } = useLike({
    likes,
    token,
    userId: userData?.userId,
    postId: id,
    setPosts,
    setPostData,
  });

  const likeCount = likes.length;
  const commentCount = comments.length;
  const timeCreated = formatDistanceToNow(new Date(createdAt));
  const likeIcon = isLiked ? <AiFillLike style={{ color: '#0064FF' }} /> : <AiOutlineLike />;

  const menuItems = useMemo(() => {
    const isOwnPost = userData?.userId === user.userId;
    const menuList = postItems(id, isOwnPost, location.pathname);

    return menuList;
  }, [id, userData?.userId, user.userId, location.pathname]);

  const viewUser = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      navigate(`/profile/${user.userId}`);
    },
    [navigate, user.userId]
  );

  const toggleComment = useCallback(() => {
    setShowComment((state) => !state);
  }, []);

  return (
    <PostCard>
      <Row justify="space-between">
        <AvatarContainer onClick={viewUser}>
          <Avatar src={user.profilePicture} size={40}>
            {user.firstName[0].toUpperCase()}
          </Avatar>
          <UserContainer>
            <Typography.Text>{`${user.firstName} ${user.lastName}`}</Typography.Text>
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

      <Paragraph>{post}</Paragraph>

      <Divider />

      <Row>
        <PostButton type="link" disabled={isLikeLoading} onClick={toggleLike} icon={likeIcon}>
          {likeCount} Like{likeCount > 1 && 's'}
        </PostButton>
        <PostButton type="link" onClick={toggleComment} icon={<AiOutlineComment />}>
          {commentCount} Comment{commentCount > 1 && 's'}
        </PostButton>
      </Row>

      {isShowComment && (
        <Comment
          token={token}
          postId={id}
          setPostData={setPostData}
          setPosts={setPosts}
          comments={comments}
        />
      )}
    </PostCard>
  );
};

export default Post;
