'use client'

import { PersonCircle, EmojiDizzy } from 'react-bootstrap-icons'
import { Card, Row, Col, Spinner, Container, Nav } from 'react-bootstrap'
import { AppLink } from '@/component/AppLink'
import { AppAlert } from '@/component/AppAlert'
import { useRoomList, formatCreate_at } from './hooks'
import { RoomCard } from '@/component/RoomCard'
import { useState } from 'react'

export function RoomClient() {
  const { rooms, error, isLoading } = useRoomList()
  const [isClosed, setIsClosed] = useState<boolean>(false)

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
      <Nav variant="underline" defaultActiveKey="false">
        <Nav.Item>
          <Nav.Link eventKey="false" onClick={() => setIsClosed(false)}>
            やり取り中
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="true" onClick={() => setIsClosed(true)}>
            取引終了
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {rooms
        .filter((room) => room.isClosed === isClosed)
        .map((room) => {
          return (
            <AppLink href={`/chat/${room.id}`}>
              <RoomCard
                username={room.otherUser.user.name}
                created_at={room.created_at}
                title={room.request.title}
                color={room.request.color}
                message={room.message || 'メッセージがありません'}
              />
            </AppLink>
          )
        })}
    </>
  )
}
