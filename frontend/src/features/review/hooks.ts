import { fetcher } from '@/lib/axios'
import { Reviews } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useReviewList = (
  userId: number
): {
  reviews: Reviews[]
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(`/reviews/${userId}`, fetcher)
  return {
    reviews: data?.data.reviews,
    error,
    isLoading,
  }
}
