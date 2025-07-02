import axios from 'axios'
import { API_BASE_URL } from '../config'

export const getAdminStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/stats`)
  return response.data
}

export const getAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/users`)
  return response.data
}