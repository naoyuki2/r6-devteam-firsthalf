import { getItem } from '@/utils/localStorage'
import axios from 'axios'

type MethodType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type fetchWithTokenProps = {
  method: MethodType
  url: string
  args?: unknown
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HAKOBUN_API_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: 'Bearer your_token',
  },
})

export const fetchWithToken = async ({
  method,
  url,
  args,
}: fetchWithTokenProps) => {
  const token = getItem('token')

  if (!token) return

  switch (method) {
    case 'GET':
      return apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    case 'POST':
      return apiClient.post(url, args, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    case 'PATCH':
      return apiClient.patch(url, args, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    case 'DELETE':
      return apiClient.delete(url)
  }
}

export const fetcher = (url: string) => fetchWithToken({ method: 'GET', url })
