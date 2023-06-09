import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import * as api from '../../api';

import getErrorMessage from '../../utils/getErrorMessage';
import useAuth from '../../hooks/useAuth';
import { SafePostUser } from '../../types';
import Loader from '../../components/Loader';
import { Typography } from 'antd';

const ProfilePage = () => {
  const { token } = useAuth();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<SafePostUser>();

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getUser(params.id ?? '', token);

      setUserData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status !== 404) {
        toast.error(getErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, [params.id, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {userData ? (
        <>
          <div>Profile Picture: {userData?.profilePicture}</div>
          <div>Name: {userData?.firstName}</div>
        </>
      ) : (
        <Typography.Title>User not found</Typography.Title>
      )}
    </>
  );
};

export default ProfilePage;
