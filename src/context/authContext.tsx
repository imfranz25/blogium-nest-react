import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  token: '',
  user: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerToken: (_accessToken: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLogout: () => {},
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const resetAuth = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    setIsAuthenticated(false);
    setToken('');
    setUser('');
  }, []);

  const registerToken = useCallback(
    (accessToken: string) => {
      try {
        const decodedToken = jwtDecode(accessToken);
        const userData = JSON.stringify(decodedToken);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', userData);

        setUser(userData);
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

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const accessToken = localStorage.getItem('accessToken') || '';
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const expiration = decoded?.exp ?? 0;

        console.log(Date.now() >= expiration * 1000);

        if (Date.now() >= expiration * 1000) {
          resetAuth();
        }
      } catch (error) {
        resetAuth();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  console.log('rendered');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

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
