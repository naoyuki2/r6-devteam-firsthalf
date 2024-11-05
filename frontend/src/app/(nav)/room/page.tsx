'use client'

import { useEffect, useState } from 'react'
import { PersonCircle } from 'react-bootstrap-icons'
import { getItem } from '@/utils/localStorage'

// utils/localStorage.ts からインポート

interface Room {
  id: string
  created_at: string
  room_users: { user: { id: number; name: string } }[]
  messages: { content: string }[]
}

export default function Room() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    // クライアントサイドでのみ utils の getItem を使用して取得
    setCurrentUserId(getItem('userId'))

    const fetchRooms = async () => {
      try {
        const token = getItem('token') // ここも utils の getItem を使用
        if (!token) throw new Error('Token not found')

        const response = await fetch('http://localhost:3030/rooms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json()

        const uniqueRooms = data.rooms.filter(
          (room: Room, index: number, self: Room[]) =>
            index === self.findIndex((r) => r.id === room.id)
        )

        setRooms(uniqueRooms)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {rooms.map((room) => {
        const lastMessage =
          room.messages.length > 0
            ? room.messages[room.messages.length - 1].content
            : 'まだメッセージがありません'
        const otherUser = room.room_users.find(
          (roomUser) => roomUser.user.id.toString() !== currentUserId
        )?.user

        return (
          <div
            key={room.id}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="d-flex">
              <PersonCircle size={48} className="mb-4" />
              <div>
                <p className="mb-0">{otherUser?.name || 'Unknown'}</p>
                <p className="mb-2 text-truncate">{lastMessage}</p>
              </div>
            </div>
            <div>
              <p>{new Date(room.created_at).toLocaleTimeString()}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
