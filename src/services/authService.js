import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create a reusable axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Register a new user
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    // Optionally store token here if backend returns it in response
    // localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// Logout user
export const logout = async () => {
  try {
    await API.get('/auth/logout');
  } catch (error) {
    console.warn('Logout request failed:', error.message);
  } finally {
    localStorage.removeItem('token');
  }
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await API.get('/auth/me');
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await API.put('/auth/updatedetails', userData);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// Helper for handling errors uniformly
const handleAuthError = (error) => {
  const message = error.response?.data?.message || 'Authentication error';
  throw new Error(message);
};
