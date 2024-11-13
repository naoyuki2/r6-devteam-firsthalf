'use client'

import { useEffect, useState } from 'react'
import { PersonCircle } from 'react-bootstrap-icons'
import { getItem } from '@/utils/localStorage'
import { useCurrentUser } from '@/lib/jotai/userState'
import { apiClient } from '@/lib/axios'
import { Card, Row, Col, Spinner, Alert, Container } from 'react-bootstrap'

interface Room {
  id: string
  created_at: string
  room_users: { user: { id: number; name: string } }[]
  messages: { body: string }[]
}

export function RoomClient() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = getItem('token')
        if (!token) throw new Error('Token not found')

        const res = await apiClient.get('/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res) {
          throw new Error(`Error: ${res}`)
        }
        setRooms(res.data.rooms)
      } catch (error: unknown) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">Error: {error}</Alert>
  if (rooms.length === 0)
    return <Alert variant="info">ルームがありません</Alert>

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-start"
      style={{ height: '100vh', paddingTop: '0.5rem' }}
    >
      {rooms.map((room) => {
        const lastMessage =
          room.messages.length > 0
            ? room.messages[room.messages.length - 1].body
            : 'まだメッセージがありません'
        const otherUser = room.room_users.find(
          (roomUser) => roomUser.user.id !== currentUser?.id
        )?.user

        return (
          <Card key={room.id} className="mb-3" style={{ width: '100%' }}>
            <Card.Body className="z-0">
              <Row className="align-items-center">
                <Col xs="auto">
                  <PersonCircle size={48} />
                </Col>
                <Col className="text-truncate">
                  <p className="mb-0">{otherUser?.name || 'Unknown'}</p>
                  <p className="text-truncate">{lastMessage}</p>
                </Col>
                <Col xs="auto" className="text-muted text-end">
                  {new Date(room.created_at).toLocaleTimeString()}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
      })}
    </Container>
  )
}
