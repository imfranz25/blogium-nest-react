/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';

import getErrorMessage from '../utils/getErrorMessage';
import { SafeError } from '../types';
import useAuth from './useAuth';

const useFetch = (endpoint: string, options: any) => {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { sessionGuard } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      sessionGuard();
      const response = await axios(`${API}${endpoint}`, options);
      setData(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error as SafeError));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, options, API, sessionGuard]);

  useEffect(() => {
    fetchData();
  }, [endpoint, fetchData]);

  return { isLoading, data };
};

export default useFetch;
