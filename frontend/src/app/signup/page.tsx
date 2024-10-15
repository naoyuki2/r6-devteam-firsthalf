import { SignUpClient } from '@/features/signup'
import { Container } from 'react-bootstrap'

export default function Login() {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fw-bold fs-2 text-center">新規登録</p>
      <SignUpClient />
    </Container>
  )
}
