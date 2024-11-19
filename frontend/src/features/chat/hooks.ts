import { fetchWithToken } from '@/lib/axios'
import { DraftRequest, Message, Room } from '@/types'
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

export const useDraftRequest = (
  roomId: string
): {
  draftRequest: DraftRequest
  error: Error
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(
    `/draft_requests/${roomId}`,
    fetchWithToken
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
  const { data, error, isLoading } = useSWR(
    `/messages/${roomId}`,
    fetchWithToken
  )
  return {
    messages: data?.data.messages,
    error,
    isLoading,
  }
}
