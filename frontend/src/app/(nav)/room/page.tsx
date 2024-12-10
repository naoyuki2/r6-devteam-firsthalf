import TopNav from '@/component/TopNav'
import { RoomClient } from '@/features/room'
import { Container } from 'react-bootstrap'

export default function Room() {
  return (
    <>
      <TopNav text="メッセージ" />
      <Container>
        <RoomClient />
      </Container>
    </>
  )
}
