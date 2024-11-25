import { fetcher } from '@/lib/axios'
import { DraftRequest, GetByRoomIdRes, Message, Room } from '@/types'
import Error from 'next/error'
import useSWR from 'swr'

export const useRoom = (
  roomId: string
): {
  room: GetByRoomIdRes
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(`/rooms/${roomId}`, fetcher)
  return {
    room: data?.data.room,
    error,
    isLoading,
  }
}

export const useDraftRequest = (
  roomId: string
): {
  draftRequest: DraftRequest
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(
    `/draft_requests/${roomId}`,
    fetcher
  )
  return {
    draftRequest: data?.data.draft_request,
    error,
    isLoading,
  }
}

export const useMessage = (
  roomId: string
): {
  messages: Message[]
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(`/messages/${roomId}`, fetcher)
  return {
    messages: data?.data.messages,
    error,
    isLoading,
  }
}
