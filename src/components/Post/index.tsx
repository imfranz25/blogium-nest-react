import { Row } from 'antd';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';

import Comment from './CommentForm';
import PostAvatar from './PostAvatar';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import usePost from '../../hooks/usePost';
import { PostCard, Paragraph, PostButton, Divider } from './styles';
import { SafePostUser, SafePostComment, SafeLikePost } from '../../types';

interface PostProps {
  id: string;
  post: string;
  createdAt: string;
  postOwner: SafePostUser;
  likes: SafeLikePost[];
  comments: SafePostComment[];
}

const Post: React.FC<PostProps> = ({ id, post, postOwner, createdAt, likes, comments }) => {
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
      <PostAvatar
        postId={id}
        postOwner={postOwner}
        timeCreated={timeCreated}
        userId={userData?.userId}
      />
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
