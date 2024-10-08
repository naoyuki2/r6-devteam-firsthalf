import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // APIのベースURL
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})
