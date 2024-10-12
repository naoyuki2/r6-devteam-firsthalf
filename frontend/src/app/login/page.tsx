import { LoginClient } from '@/features/login'
import { Container } from 'react-bootstrap'

export default function Login() {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fw-bold fs-2 text-center">ログイン</p>
      <LoginClient />
    </Container>
  )
}
