import { SafeError } from '../types';

const getErrorMessage = (error: SafeError) => {
  // const errorCode = error.response.status === 401;
  let errorMessage;

  if (Array.isArray(error?.response?.data?.message)) {
    errorMessage = error.response.data.message[0];
  } else {
    errorMessage = error?.response?.data?.message;
  }

  return errorMessage ?? 'Something went wrong';
};

export default getErrorMessage;
