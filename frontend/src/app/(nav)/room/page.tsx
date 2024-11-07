import { RoomClient } from '@/features/room'
import { Container } from 'react-bootstrap'

export default function Room() {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <RoomClient />
    </Container>
  )
}
