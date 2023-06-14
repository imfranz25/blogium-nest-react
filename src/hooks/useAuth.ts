import jwtDecode from 'jwt-decode';
import { create } from 'zustand';

import { SafeUser } from '../types';
import toast from 'react-hot-toast';

interface AuthStore {
  token: string | null;
  user: SafeUser | null;
  clearSession: () => void;
  sessionGuard: () => boolean;
  registerSession: (accessToken: string) => void;
}

const useAuth = create<AuthStore>((set, get) => {
  const token = localStorage.getItem('accessToken') || null;

  const clearSession = () => {
    localStorage.removeItem('accessToken');
    set({ user: null, token: null });
  };

  const registerSession = (accessToken: string) => {
    let decodedToken: SafeUser | null = null;

    try {
      decodedToken = jwtDecode(accessToken);
      localStorage.setItem('accessToken', accessToken);

      set({ user: decodedToken, token: accessToken });
    } catch (error) {
      clearSession();
    }

    return decodedToken;
  };

  /* Returns true if token is expired else false */
  const sessionGuard = () => {
    const userState = get().user;

    if (!userState) {
      return true;
    }

    const isTokenExpired = Date.now() >= userState.exp * 1000;

    if (isTokenExpired) {
      toast.error('Session expired');
      clearSession();

      return true;
    }

    return false;
  };

  return {
    token,
    user: token ? registerSession(token) : null,
    registerSession,
    clearSession,
    sessionGuard,
  };
});

export default useAuth;
