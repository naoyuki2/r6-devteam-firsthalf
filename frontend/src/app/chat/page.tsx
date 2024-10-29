import ChatClient from '@/features/chat'
import { Suspense } from 'react'
import { Container } from 'react-bootstrap'

export default function Chat() {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fw-bold fs-2 text-center">チャットルーム</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatClient />
      </Suspense>
    </Container>
  )
}
