import { toast } from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import useAuth from './useAuth';
import { SafeError } from '../types';
import getErrorMessage from '../utils/getErrorMessage';

interface IUseFetch {
  endpoint: string;
  skipInitialInvocation?: boolean;
  includeToken?: boolean;
}

const useFetch = ({ endpoint, skipInitialInvocation = false, includeToken = true }: IUseFetch) => {
  const API = import.meta.env.VITE_BACKEND_URL;
  const { sessionGuard, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState<AxiosResponse | null>(null);

  const fetchData = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      try {
        setIsLoading(true);
        const isExpired = sessionGuard();

        /* For protected endpoints - check for expiration */
        if (isExpired && includeToken) {
          return;
        }

        if (includeToken) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }

        const response = await axios(`${API}${endpoint}`, config);

        setResData(response);

        return response;
      } catch (error) {
        const errorObj = error as SafeError;

        /* Handle not found separately */
        if (errorObj?.response?.status === 404) {
          return;
        }

        toast.error(getErrorMessage(errorObj));
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, includeToken, API, sessionGuard, token]
  );

  useEffect(() => {
    if (!skipInitialInvocation) {
      fetchData();
    }
  }, [fetchData, skipInitialInvocation]);

  return { isLoading, resData, refetch: fetchData };
};

export default useFetch;
