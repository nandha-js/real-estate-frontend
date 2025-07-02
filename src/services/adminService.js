import axios from 'axios';
import { API_BASE_URL } from '../config';

// Utility: Get token from localStorage
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch admin statistics
export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/stats`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    throw error;
  }
};

// Fetch all users (for admin)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
