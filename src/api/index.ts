import axios from 'axios';
import { FieldValues } from 'react-hook-form';

const API = import.meta.env.VITE_BACKEND_URL;

/* Auth */
export const loginUser = async (userCredentials: FieldValues) => {
  return await axios({
    method: 'post',
    url: `${API}/auth/login`,
    data: userCredentials,
  });
};
