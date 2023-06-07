import * as api from '../../api';
import { toast } from 'react-hot-toast';
import { FaEllipsisH } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown, Button, Row, Typography } from 'antd';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import Input from '../Input';
import useAuth from '../../hooks/useAuth';
import useLike from '../../hooks/useLike';
import postItems from '../../utils/getPostMenu';
import getErrorMessage from '../../utils/getErrorMessage';
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

interface PostProps {
  id: string;
  post: string;
  user: SafePostUser;
  likes: SafeLikePost[];
  comments: SafePostComment[];
  setPosts?: Dispatch<SetStateAction<SafePost[]>>;
  setPostData?: Dispatch<SetStateAction<SafePost | null>>;
  createdAt: string;
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
  const [isLoading, setIsLoading] = useState(false);
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { comment: '' } });

  const commentCount = comments.length;
  const likeCount = likes.length;
  const timeCreated = formatDistanceToNow(new Date(createdAt));

  const menuItems = useMemo(() => {
    const isOwnPost = userData?.userId === user.userId;
    const menuList = postItems(id, isOwnPost, location.pathname);

    return menuList;
  }, [id, userData?.userId, user.userId, location.pathname]);

  const onSubmitComment = useCallback(
    async (comment: FieldValues) => {
      try {
        setIsLoading(true);
        const response = await api.addComment(id, comment, token);

        if (setPosts) {
          setPosts((posts) => {
            const postIndex = posts.findIndex((post) => post.id === id);
            const updatedPost = { ...posts[postIndex] };

            updatedPost.Comment.push(response.data);
            posts[postIndex] = updatedPost;

            return posts;
          });
        }

        if (setPostData) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setPostData((post: any) => {
            const updatedPost = { ...post };

            updatedPost?.Comment?.push(response.data);

            return updatedPost;
          });
        }

        toast.success('Comment successfully added');
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        reset();
        setIsLoading(false);
      }
    },
    [id, reset, setPostData, setPosts, token]
  );

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
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <Button type="text">
            <FaEllipsisH />
          </Button>
        </Dropdown>
      </Row>

      <Paragraph>{post}</Paragraph>

      <Divider style={{ margin: '15px 0' }} />
      <PostButton
        type="link"
        disabled={isLikeLoading}
        onClick={toggleLike}
        icon={isLiked ? <AiFillLike style={{ color: 'blue' }} /> : <AiOutlineLike />}
      >
        {likeCount} Like{likeCount > 1 && 's'}
      </PostButton>
      <PostButton type="link" onClick={toggleComment} icon={<AiOutlineComment />}>
        {commentCount} Comment{commentCount > 1 && 's'}
      </PostButton>

      {isShowComment && (
        <>
          <Divider />
          <div>
            <Input
              id="comment"
              register={register}
              errors={errors}
              setValue={setValue}
              placeholder="Write a comment..."
              suffix={
                <PostButton
                  onClick={handleSubmit(onSubmitComment)}
                  loading={isLoading}
                  icon={<IoSend />}
                />
              }
            />
          </div>
          <div>
            Comments:
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.comment}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </PostCard>
  );
};

export default Post;
