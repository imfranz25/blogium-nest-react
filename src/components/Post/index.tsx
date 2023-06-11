import { FaEllipsisH } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Dropdown, Button, Row, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';

import Comment from './CommentForm';
import useAuth from '../../hooks/useAuth';
import postItems from '../../utils/getPostMenu';
import { SafePostUser, SafePostComment, SafeLikePost } from '../../types';
import {
  AvatarContainer,
  PostCard,
  UserContainer,
  Avatar,
  Paragraph,
  PostButton,
  Divider,
} from './styles';
import useFetch from '../../hooks/useFetch';
import toast from 'react-hot-toast';
import usePost from '../../hooks/usePost';

interface PostProps {
  id: string;
  post: string;
  createdAt: string;
  postOwner: SafePostUser;
  likes: SafeLikePost[];
  comments: SafePostComment[];
}

const Post: React.FC<PostProps> = ({ id, post, postOwner, createdAt, likes, comments }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: userData } = useAuth();
  const { updateLikePost } = usePost();
  const [isShowComment, setShowComment] = useState(false);

  const { isLoading, refetch: likeToggler } = useFetch({
    endpoint: `/post/like/${id}`,
    skipInitialInvocation: true,
  });

  /* Post Details */
  const likeCount = likes.length;
  const commentCount = comments.length;
  const timeCreated = formatDistanceToNow(new Date(createdAt));
  const isLiked = likes.some((like) => like.userId === userData?.userId);
  const likeIcon = isLiked ? <AiFillLike style={{ color: '#0064FF' }} /> : <AiOutlineLike />;

  /* Post Options */
  const menuItems = useMemo(() => {
    const isOwnPost = userData?.userId === postOwner.userId;
    const menuList = postItems(id, isOwnPost, location.pathname);

    return menuList;
  }, [id, userData?.userId, postOwner.userId, location.pathname]);

  const viewUser = useCallback(() => {
    navigate(`/profile/${postOwner.userId}`);
  }, [navigate, postOwner.userId]);

  const toggleComment = useCallback(() => {
    setShowComment((state) => !state);
  }, []);

  const likeHandler = useCallback(async () => {
    const likeMethod = isLiked ? 'DELETE' : 'POST';
    const response = await likeToggler({ method: likeMethod });

    /* Liked */
    if (response && userData) {
      toast.success(`Post ${likeMethod === 'POST' ? 'liked' : 'unliked'}`);
      updateLikePost(id, userData.userId, response.data);
    }
  }, [isLiked, likeToggler, id, updateLikePost, userData]);

  return (
    <PostCard>
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
      <Paragraph>{post}</Paragraph>
      <Divider />
      <Row>
        <PostButton type="link" disabled={isLoading} onClick={likeHandler} icon={likeIcon}>
          {likeCount} Like{likeCount > 1 && 's'}
        </PostButton>
        <PostButton type="link" onClick={toggleComment} icon={<AiOutlineComment />}>
          {commentCount} Comment{commentCount > 1 && 's'}
        </PostButton>
      </Row>
      {isShowComment && <Comment postId={id} comments={comments} />}
    </PostCard>
  );
};

export default Post;
