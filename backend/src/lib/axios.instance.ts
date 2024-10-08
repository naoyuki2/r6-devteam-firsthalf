import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // APIのベースURL
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})
