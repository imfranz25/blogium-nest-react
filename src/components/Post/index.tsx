import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PostProps {
  id: string;
  post: string;
}

const Post: React.FC<PostProps> = ({ id, post }) => {
  const navigate = useNavigate();

  return <div onClick={() => navigate(`/post/${id}`)}>{post}</div>;
};

export default Post;
