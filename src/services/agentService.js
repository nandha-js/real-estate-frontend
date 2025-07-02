import axios from 'axios';
import { API_BASE_URL } from '../config';

// Utility to include auth token if needed
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all agents (public route)
export const getAgents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agents`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    throw error;
  }
};

// Get agent details by ID
export const getAgentDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch agent details for ID ${id}:`, error);
    throw error;
  }
};

// Get properties listed by a specific agent
export const getAgentProperties = async (agentId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/agents/${agentId}/properties`,
      authHeader() // Use this only if endpoint is protected
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch properties for agent ${agentId}:`, error);
    throw error;
  }
};
