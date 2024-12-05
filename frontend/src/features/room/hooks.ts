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

export const formatCreate_at = (dateString: Date) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleDateString('ja-JP', options)
}
