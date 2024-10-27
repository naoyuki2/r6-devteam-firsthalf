import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.HAKOBUN_API_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})
