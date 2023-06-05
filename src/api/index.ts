import axios from 'axios';
import { FieldValues } from 'react-hook-form';

const API = import.meta.env.VITE_BACKEND_URL;

/* Auth */
export const loginUser = async (userCredentials: FieldValues) => {
  return await axios.post(`${API}/auth/login`, userCredentials);
};

/* User */
export const createUser = async (userData: FieldValues) => {
  return await axios.post(`${API}/user`, userData);
};

export const getUser = async (userId: string, token: string) => {
  return await axios.get(`${API}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* Post */
export const createPost = async (postData: FieldValues, token: string) => {
  return await axios.post(`${API}/post`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPost = async (postId: string, token: string) => {
  return await axios.get(`${API}/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllPosts = async (token: string) => {
  return await axios.get(`${API}/post`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addComment = async (postId: string, commentData: FieldValues, token: string) => {
  return await axios.post(`${API}/post/comment/${postId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const likePost = async (postId: string, token: string) => {
  return await axios.post(
    `${API}/post/like/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const unlikePost = async (postId: string, token: string) => {
  return await axios.delete(`${API}/post/like/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
