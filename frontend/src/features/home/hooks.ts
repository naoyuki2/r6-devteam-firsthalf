import { fetchWithToken } from '@/lib/axios'
import { Request } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useRequestList = (
  query: string
): {
  requests: Request[]
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(`/requests${query}`, fetchWithToken)
  return {
    requests: data?.data.requests,
    error,
    isLoading,
  }
}
