import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from '../services/authService';

const AuthContext = createContext();

/**
 * AuthProvider manages global authentication state and actions
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser(); // optional: decode token instead
        setUser(userData);
      } catch (error) {
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
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.warn('Logout service error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the Auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
