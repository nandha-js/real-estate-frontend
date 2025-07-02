import axios from 'axios'
import { API_BASE_URL } from '../config'

export const getAgents = async () => {
  const response = await axios.get(`${API_BASE_URL}/agents`)
  return response.data
}

export const getAgentDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/agents/${id}`)
  return response.data
}

export const getAgentProperties = async (agentId) => {
  const response = await axios.get(`${API_BASE_URL}/agents/${agentId}/properties`)
  return response.data
}