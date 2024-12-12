'use client'

import { EmojiDizzy } from 'react-bootstrap-icons'
import { Card, Spinner, Container, Nav } from 'react-bootstrap'
import { AppAlert } from '@/component/AppAlert'
import { useRoomList } from './hooks'
import { RoomCard } from '@/component/RoomCard'
import { useState } from 'react'

export function RoomClient() {
  const { rooms, error, isLoading } = useRoomList()
  const [isClosed, setIsClosed] = useState<boolean>(false)

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="ルームの取得に失敗しました" />
  if (!rooms?.filter((room) => room.isClosed === isClosed).length)
    return (
      <>
        <Nav
          variant="underline"
          defaultActiveKey="false"
          className="justify-content-center"
        >
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
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '70vh' }}
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
      </>
    )

  return (
    <>
      <Nav
        variant="underline"
        defaultActiveKey="false"
        className="justify-content-center mb-1"
      >
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
            <RoomCard
              key={room.id}
              roomId={room.id}
              username={room.otherUser.user.name}
              created_at={room.created_at}
              title={room.request.title}
              color={room.request.color}
              message={room.message || 'メッセージがありません'}
              isClosed={room.isClosed}
            />
          )
        })}
    </>
  )
}
