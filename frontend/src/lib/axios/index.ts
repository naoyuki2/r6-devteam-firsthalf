import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HAKOBUN_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})
