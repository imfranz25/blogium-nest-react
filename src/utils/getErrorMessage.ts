import { SafeError } from '../types';

const getErrorMessage = (error: SafeError) => {
  // const errorCode = error.response.status === 401;
  let errorMessage;

  if (Array.isArray(error.response.status)) {
    errorMessage = error.response.data.message[0];
  } else {
    errorMessage = error.response.data.message;
  }

  return errorMessage;
};

export default getErrorMessage;
