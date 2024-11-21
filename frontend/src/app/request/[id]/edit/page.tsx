import RequestUpdateClient from '@/features/request/editrequset'
import { Container } from 'react-bootstrap'

export default function Request() {
  return (
    <Container className="my-5 p-3 shadow rounded">
      <h3 className="text-center mb-3">依頼を修正</h3>
      <RequestUpdateClient />
    </Container>
  )
}
