import useSWR from 'swr'
import { fetcher, fetchWithToken } from '@/lib/axios'
import { CreateRequestForm } from '@/types'

export const useRequest = (
  requestId: number
): {
  request: CreateRequestForm
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(`/requests/${requestId}`, fetcher)
  return {
    request: data?.data.request,
    error,
    isLoading,
  }
}
