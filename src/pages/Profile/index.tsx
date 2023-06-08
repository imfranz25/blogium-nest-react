import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import * as api from '../../api';

import getErrorMessage from '../../utils/getErrorMessage';
import useAuth from '../../hooks/useAuth';
import { SafePostUser } from '../../types';

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
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [params.id, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>Profile Picture: {userData?.profilePicture}</div>
      <div>Name: {userData?.firstName}</div>
    </>
  );
};

export default ProfilePage;
