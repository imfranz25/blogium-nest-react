import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { SafeUser } from '../types';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  token: '',
  user: null as SafeUser,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerToken: (_accessToken: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLogout: () => {},
});

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('accessToken') ?? '');
  const [user, setUser] = useState<SafeUser>(null);

  const resetAuth = useCallback(() => {
    localStorage.removeItem('accessToken');

    setIsAuthenticated(false);
    setToken('');
    setUser(null);
    navigate('/');
  }, [navigate]);

  const registerToken = useCallback(
    (accessToken: string) => {
      try {
        const decodedToken: SafeUser = jwtDecode(accessToken);
        localStorage.setItem('accessToken', accessToken);

        setUser(decodedToken);
        setToken(accessToken);
        setIsAuthenticated(true);
      } catch (error) {
        resetAuth();
      }
    },
    [resetAuth]
  );

  const onLogout = useCallback(() => {
    resetAuth();
  }, [resetAuth]);

  /* Page mount -> check for existing token */
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      registerToken(accessToken);
    }
  }, [registerToken]);

  /* To check token expiration */
  useEffect(() => {
    if (isAuthenticated) {
      console.log('rendered');
      const decoded = jwtDecode<JwtPayload>(token);
      const expiration = decoded?.exp ?? 0;

      if (Date.now() >= expiration * 1000) {
        toast.error('Session expired');
        resetAuth();
      }
    }
  }, [location, isAuthenticated, token, resetAuth]);

  const values = useMemo(
    () => ({
      token,
      user,
      registerToken,
      onLogout,
    }),
    [token, user, onLogout, registerToken]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
