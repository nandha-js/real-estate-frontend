import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from '../services/authService';

const AuthContext = createContext();

/**
 * AuthProvider manages global authentication state and actions.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
        } else {
          const userData = await getCurrentUser(); // can also decode token here
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService(); // optional: just clear token if logout API not used
    } catch (error) {
      console.warn('Logout error (ignored):', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook to consume AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
