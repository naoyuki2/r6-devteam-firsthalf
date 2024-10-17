import { LandingClient } from '@/features/landing'
import { Container } from 'react-bootstrap'

export default function Landing() {
  return (
    <Container
      fluid
      className="bg-light min-vh-100"
      style={{ background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)' }}
    >
      <LandingClient />
    </Container>
  )
}
