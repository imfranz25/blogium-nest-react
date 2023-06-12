import { SafeError } from '../types';

/**
 * Fetch error message from error object
 * For array of errors (return the first index/message)
 * else return the error message returned by the BE
 * @param {SafeError} error
 * @returns {string}
 */
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
