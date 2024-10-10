import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3030', // APIのベースURL
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})
