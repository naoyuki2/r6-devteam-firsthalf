import TopNav from '@/component/TopNav'
import { Container } from 'react-bootstrap'
import { NotificationsClient } from '@/features/notifications'
export default function Notifications() {
  return (
    <>
      <TopNav text="通知" />
      <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <NotificationsClient />
      </Container>
    </>
  )
}
