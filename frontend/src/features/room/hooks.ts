import { fetcher } from '@/lib/axios'
import { Room } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useRoomList = (): {
  rooms: Room[]
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR('/rooms', fetcher)
  return {
    rooms: data?.data.rooms,
    error,
    isLoading,
  }
}
