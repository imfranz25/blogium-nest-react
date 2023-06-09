import * as api from '../api';

const getAllPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.getAllPosts(token || '');

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export { getAllPosts };
