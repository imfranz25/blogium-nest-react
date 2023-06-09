import { create } from 'zustand';
import { SafeUser } from '../types';
import jwtDecode from 'jwt-decode';

interface AuthStore {
  token: string;
  user: SafeUser | null;
  logOut: () => void;
  registerSession: (accessToken: string) => void;
}

const useUser = create<AuthStore>((set) => {
  const clearSession = () => {
    localStorage.removeItem('accessToken');
    set({ user: null, token: '' });
  };

  return {
    token: '',
    user: null,
    logOut: () => clearSession(),
    registerSession: (accessToken) => {
      try {
        const decodedToken: SafeUser = jwtDecode(accessToken);
        localStorage.setItem('accessToken', accessToken);

        set({ user: decodedToken, token: accessToken });
      } catch (error) {
        clearSession();
      }
    },
  };
});

export default useUser;
