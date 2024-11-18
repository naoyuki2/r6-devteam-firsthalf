import { getItem } from '@/utils/localStorage'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HAKOBUN_API_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})

export const fetchWithToken = async (url: string) => {
  const token = getItem('token')

  if (!token) return

  return await apiClient.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
