import axios from 'axios';
import { Credentials, UserDetails, PostDetail, CommentDetail } from '../types/formTypes';

const API = import.meta.env.VITE_BACKEND_URL;

type Token = string | null;

/* Auth */
export const loginUser = async (userCredentials: Credentials) => {
  return await axios.post(`${API}/auth/login`, userCredentials);
};

/* User */
export const createUser = async (userData: UserDetails) => {
  return await axios.post(`${API}/user`, userData);
};

export const getUser = async (userId: string, token: Token) => {
  return await axios.get(`${API}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* Post */
export const createPost = async (postData: PostDetail, token: Token) => {
  return await axios.post(`${API}/post`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPost = async (postId: string, token: Token) => {
  return await axios.get(`${API}/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllPosts = async (token: Token) => {
  return await axios.get(`${API}/post`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addComment = async (postId: string, commentData: CommentDetail, token: Token) => {
  return await axios.post(`${API}/post/comment/${postId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const likePost = async (postId: string, token: Token) => {
  return await axios.post(
    `${API}/post/like/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const unlikePost = async (postId: string, token: Token) => {
  return await axios.delete(`${API}/post/like/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
