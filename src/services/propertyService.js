import axios from 'axios'
import { API_BASE_URL } from '../config'

export const getProperties = async (filters = {}) => {
  const response = await axios.get(`${API_BASE_URL}/properties`, { params: filters })
  return response.data
}

export const getPropertyDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/properties/${id}`)
  return response.data
}