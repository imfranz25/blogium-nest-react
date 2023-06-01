import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { SafeUser } from '../types';

interface AuthContextProviderProps {
  children: React.ReactNode;
  skip?: boolean;
}

const AuthContext = createContext({
  isAuthenticated: false,
  token: '',
  user: null as SafeUser,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerToken: (_accessToken: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLogout: () => {},
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('accessToken') ?? '');
  const [user, setUser] = useState<SafeUser>(null);

  const resetAuth = useCallback(() => {
    localStorage.removeItem('accessToken');

    setIsAuthenticated(false);
    setToken('');
    setUser(null);
  }, []);

  const registerToken = useCallback(
    (accessToken: string) => {
      try {
        const decodedToken: SafeUser = jwtDecode(accessToken);
        const userData = JSON.stringify(decodedToken);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', userData);

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
      const decoded = jwtDecode<JwtPayload>(token);
      const expiration = decoded?.exp ?? 0;

      if (Date.now() >= expiration * 1000) {
        resetAuth();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const values = useMemo(
    () => ({
      isAuthenticated,
      token,
      user,
      registerToken,
      onLogout,
    }),
    [isAuthenticated, token, user, onLogout, registerToken]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
