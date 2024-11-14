import { fetchWithToken } from '@/lib/axios'
import { Room } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useRoomList = (): {
  rooms: Room[]
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR('/rooms', fetchWithToken)
  return {
    rooms: data?.data.rooms,
    error,
    isLoading,
  }
}
