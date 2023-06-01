// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any) => {
  const errorCode = error?.response?.status || 500;
  let errorMessage;

  switch (errorCode) {
    case 400:
    case 409:
      errorMessage = error?.response?.data?.message[0];
      break;
    case 401:
    case 404:
      errorMessage = error?.response?.data?.message;
      break;
  }

  return errorMessage ?? 'Something went wrong';
};

export default getErrorMessage;
