'use client'
import { Container, Col } from 'react-bootstrap'
import { ChatDots, HouseDoor, Person } from 'react-bootstrap-icons'

export default function NavBottom() {
  return (
    <nav className="bg-light py-3 px-4">
      <Container>
        <div className="d-flex justify-content-between">
          <Col xs="auto">
            <HouseDoor
              className="bi bi-house-door"
              style={{ fontSize: '2rem' }}
            />
          </Col>
          <Col xs="auto">
            <ChatDots
              className="bi bi-chat-dots"
              style={{ fontSize: '2rem' }}
            />
          </Col>
          <Col xs="auto">
            <Person className="bi bi-plus" style={{ fontSize: '2rem' }} />
          </Col>
        </div>
      </Container>
    </nav>
  )
}
