'use client'

import { AppAlert } from '@/component/AppAlert'
import ChatClient from '@/features/chat'
import { useRoom } from '@/features/chat/hooks'
import { joinRoom } from '@/utils/socket'
import { Spinner } from 'react-bootstrap'

export default function Chat({ params }: { params: { id: string } }) {
  const { room, error, isLoading } = useRoom(params.id)
  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="ルームの取得に失敗しました" />
  joinRoom({ roomId: params.id })
  return <ChatClient room={room} />
}
