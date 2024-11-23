import { fetchWithToken } from '@/lib/axios'
import { Request } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useRequest = (
  currentUserId: number | undefined
): {
  requestList: Request[] | null
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(
    currentUserId ? `/requests?filter[userId]=${currentUserId}` : null,
    fetchWithToken
  )

  return {
    requestList: data?.data.requests || null,
    error,
    isLoading,
  }
}
