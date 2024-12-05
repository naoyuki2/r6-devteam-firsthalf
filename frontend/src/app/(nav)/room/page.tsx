import TopNav from '@/component/TopNav'
import { RoomClient } from '@/features/room'
import { Container } from 'react-bootstrap'

export default function Room() {
  return (
    <>
      <TopNav text="メッセージ" />
      <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <RoomClient />
      </Container>
    </>
  )
}
