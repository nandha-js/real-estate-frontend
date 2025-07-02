import axios from 'axios';
import { API_BASE_URL } from '../config';

// ✅ Reusable Axios instance with base URL and cookies
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ✅ Get properties with optional filters (like ?limit=6)
export const getProperties = async (filters = {}) => {
  try {
    const response = await API.get('/properties', { params: filters });
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch properties');
  }
};

// ✅ Get single property details
export const getPropertyDetails = async (id) => {
  try {
    const response = await API.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch property details');
  }
};

// ✅ Centralized error handler
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  console.error(message);
  throw new Error(message);
};
