'use client'
import { Container } from 'react-bootstrap'

export default function NavTop() {
  return (
    <nav className="bg-info px-3 py-2 fixed-top shadow">
      <Container>
        <div className="d-flex justify-content-center">
          <div
            className="rounded-circle bg-dark"
            style={{ width: '2rem', height: '2rem' }}
          ></div>
        </div>
      </Container>
    </nav>
  )
}
