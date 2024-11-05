import ChatClient from '@/features/chat'
import { joinRoom } from '@/utils/socket'
import { Suspense } from 'react'
import { Container } from 'react-bootstrap'

export default function Chat({ params }: { params: { id: string } }) {
  joinRoom(params.id)
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fw-bold fs-2 text-center">チャットルーム</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatClient roomId={params.id} />
      </Suspense>
    </Container>
  )
}
