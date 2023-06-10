/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';

import useAuth from './useAuth';
import { SafeError } from '../types';
import getErrorMessage from '../utils/getErrorMessage';

interface IUseFetch {
  endpoint: string;
  skipInitialInvocation?: boolean;
}

const useFetch = ({ endpoint, skipInitialInvocation = false }: IUseFetch) => {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AxiosResponse | null>(null);
  const { sessionGuard } = useAuth();

  const fetchData = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      try {
        setIsLoading(true);
        sessionGuard();

        const response = await axios(`${API}${endpoint}`, config);

        setData(response);

        return response;
      } catch (error) {
        toast.error(getErrorMessage(error as SafeError));
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, API, sessionGuard]
  );

  useEffect(() => {
    if (!skipInitialInvocation) {
      fetchData();
    }
  }, [fetchData, skipInitialInvocation]);

  return { isLoading, data, refetch: fetchData };
};

export default useFetch;
