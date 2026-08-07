import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nltc_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('nltc_token') || null);
  const [loading, setLoading] = useState(false);

  // Sync token header & refresh profile on init if token exists
  useEffect(() => {
    if (token && !user) {
      authService
        .getProfile()
        .then((res) => {
          const profile = res.data?.data || res.data;
          setUser(profile);
          localStorage.setItem('nltc_user', JSON.stringify(profile));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      const payload = res.data?.data || res.data;
      const newToken = payload.token;
      const { token: _, ...userInfo } = payload;

      localStorage.setItem('nltc_token', newToken);
      localStorage.setItem('nltc_user', JSON.stringify(userInfo));

      setToken(newToken);
      setUser(userInfo);

      return { success: true, message: res.data?.message || 'Login successful!' };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      const payload = res.data?.data || res.data;
      const newToken = payload.token;
      const { token: _, ...userInfo } = payload;

      localStorage.setItem('nltc_token', newToken);
      localStorage.setItem('nltc_user', JSON.stringify(userInfo));

      setToken(newToken);
      setUser(userInfo);

      return { success: true, message: res.data?.message || 'Account created successfully!' };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('nltc_token');
    localStorage.removeItem('nltc_user');
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
