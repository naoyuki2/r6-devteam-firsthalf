'use client'

import { PersonCircle } from 'react-bootstrap-icons'
import { Card, Row, Col, Spinner } from 'react-bootstrap'
import { AppLink } from '@/component/AppLink'
import { AppAlert } from '@/component/AppAlert'
import { useRoomList } from './hooks'

export function RoomClient() {
  const { rooms, error, isLoading } = useRoomList()

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="ルームの取得に失敗しました" />
  if (!rooms?.length) return <p>ルームがありません</p>

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
