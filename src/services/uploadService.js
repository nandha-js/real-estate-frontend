import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create reusable axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Upload image or file (used for property images, profile pics, etc.)
export const uploadFile = async (formData) => {
  try {
    const response = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Should return file URL or object
  } catch (error) {
    const message = error.response?.data?.message || 'File upload failed';
    throw new Error(message);
  }
};
