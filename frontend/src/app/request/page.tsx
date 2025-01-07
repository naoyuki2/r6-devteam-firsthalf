import RequestClient from '@/features/request'
import TopNav from '@/component/TopNav'
import { Container } from 'react-bootstrap'

export default function Request() {
  return (
    <>
      <TopNav isArrowShow={true} text="依頼の作成" />
      <Container>
        <RequestClient />
      </Container>
    </>
  )
}
