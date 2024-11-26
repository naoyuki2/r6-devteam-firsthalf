import RequestClient from '@/features/request'
import TopNav from '@/component/TopNav'
import { Container } from 'react-bootstrap'

export default function Request() {
  return (
    <>
      <TopNav />
      <Container className="my-5 p-3 shadow rounded">
        <h3 className="text-center mb-3">依頼を作成</h3>
        <RequestClient />
      </Container>
    </>
  )
}
