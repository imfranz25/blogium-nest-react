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

/* Post */
export const createPost = async (postData: FieldValues, token: string) => {
  return await axios.post(`${API}/post`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllPost = async (token: string) => {
  return await axios.get(`${API}/post`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
