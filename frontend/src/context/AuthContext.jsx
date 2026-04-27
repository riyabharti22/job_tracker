import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startSessionTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout();
      alert('Your session has expired. Please login again.');
    }, SESSION_TIMEOUT);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');

    if (storedUser && storedToken) {
      const elapsed = Date.now() - parseInt(loginTime || '0');
      if (elapsed > SESSION_TIMEOUT) {
        logout();
      } else {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        const remaining = SESSION_TIMEOUT - elapsed;
        timerRef.current = setTimeout(() => {
          logout();
          alert('Your session has expired. Please login again.');
        }, remaining);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    localStorage.setItem('loginTime', Date.now().toString());
    startSessionTimer();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);