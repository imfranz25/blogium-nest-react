/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';

import useAuth from './useAuth';
import { SafeError } from '../types';
import getErrorMessage from '../utils/getErrorMessage';

const useFetch = (endpoint: string, options: any) => {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { sessionGuard } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      sessionGuard();

      const { data } = await axios(`${API}${endpoint}`, options);

      setData(data);
    } catch (error) {
      toast.error(getErrorMessage(error as SafeError));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, options, API, sessionGuard]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, data };
};

export default useFetch;
