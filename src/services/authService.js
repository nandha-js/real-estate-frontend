import axios from 'axios';
import { API_BASE_URL } from '../config';

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  await API.get('/auth/logout');
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await API.put('/auth/updatedetails', userData);
  return response.data;
};