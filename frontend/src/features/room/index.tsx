'use client'

import { PersonCircle } from 'react-bootstrap-icons'
import { Card, Row, Col, Spinner } from 'react-bootstrap'
import { AppLink } from '@/component/AppLink'
import { AppAlert } from '@/component/AppAlert'
import { useRoomList, formatCreate_at } from './hooks'

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
                    <p className="mb-0 fw-bold">
                      {room.otherUser.user.name || 'Unknown'}
                    </p>
                    <p>{room.message || 'メッセージがありません'}</p>
                    <p>{room.request.title}</p>
                  </Col>
                  <Col xs="auto" className="text-muted text-end">
                    {formatCreate_at(room.created_at)}
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
