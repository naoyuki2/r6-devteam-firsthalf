'use client'

import { PersonCircle, EmojiDizzy } from 'react-bootstrap-icons'
import { Card, Row, Col, Spinner, Container } from 'react-bootstrap'
import { AppLink } from '@/component/AppLink'
import { AppAlert } from '@/component/AppAlert'
import { useRoomList } from './hooks'

export function RoomClient() {
  const { rooms, error, isLoading } = useRoomList()

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="ルームの取得に失敗しました" />
  if (!rooms?.length)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Card
          className="text-center shadow-sm"
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <Card.Body>
            <EmojiDizzy
              className="text-primary mb-3"
              style={{ fontSize: '4rem' }}
            />
            <Card.Title className="text-primary fs-4">
              ルームがありません
            </Card.Title>
            <Card.Text className="text-muted">
              チャットしてみましょう！
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )

  return (
    <>
      {rooms.map((room) => {
        return (
          <Card key={room.id} className="mb-3" style={{ width: '100%' }}>
            <AppLink href={`/chat/${room.id}`}>
              <Card.Body className="z-0">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <PersonCircle size={48} />
                  </Col>
                  <Col className="text-truncate">
                    <p className="mb-0">
                      {room.otherUser.user.name || 'Unknown'}
                    </p>
                  </Col>
                  <Col xs="auto" className="text-muted text-end">
                    {new Date(room.created_at).toLocaleTimeString()}
                  </Col>
                </Row>
              </Card.Body>
            </AppLink>
          </Card>
        )
      })}
    </>
  )
}
