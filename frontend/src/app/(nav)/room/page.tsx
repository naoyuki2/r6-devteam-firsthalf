import { RoomClient } from '@/features/room'
import { Container } from 'react-bootstrap'

export default function Room() {
  return (
    <Container className="d-flex justify-content-center flex-column">
      <RoomClient />
    </Container>
  )
}
