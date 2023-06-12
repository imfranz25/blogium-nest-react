import { SafeError } from '../types';

const getErrorMessage = (error: SafeError) => {
  let errorMessage;

  if (Array.isArray(error?.response?.data?.message)) {
    errorMessage = error.response.data.message[0];
  } else {
    errorMessage = error?.response?.data?.message;
  }

  return errorMessage ?? 'Something went wrong';
};

export default getErrorMessage;
