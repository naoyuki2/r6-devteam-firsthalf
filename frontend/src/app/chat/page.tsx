'use client'
import ChatClient from '@/features/chat'
import { useSearchParams } from 'next/navigation'
import { Container } from 'react-bootstrap'

export default function Chat() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('RoomId') || ''
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fw-bold fs-2 text-center">{roomId}</p>
      <ChatClient roomId={roomId} />
    </Container>
  )
}
