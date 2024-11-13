import { fetchWithToken } from '@/lib/axios'
import { Room } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useRoom = (
  roomId: string
): {
  room: Room
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(`/rooms/${roomId}`, fetchWithToken)
  return {
    room: data?.data.room,
    error,
    isLoading,
  }
}
