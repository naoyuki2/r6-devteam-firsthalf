'use client'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/axios'
import { useCurrentUser, User } from '@/lib/jotai/userState'
import { getItem } from '@/utils/localStorage'
import {
  disconnectSocket,
  receiveMessage,
  sendMessage,
  joinRoom,
} from '@/utils/socket'
import TopNav from '@/component/TopNav'
import { Container } from 'react-bootstrap'

type roomUser = {
  user: User
}

type MessageListType = {
  id: number
  body: string
  isMine: boolean
  created_at: Date
}

const ChatClient = ({ roomId }: { roomId: string }) => {
  const currentUser = useCurrentUser()
  const [inputMessage, setInputMessage] = useState<string>('')
  const [messageList, setMessageList] = useState<MessageListType[]>([])
  const [otherUser, setOtherUser] = useState<User>()

  useEffect(() => {
    joinRoom({ roomId })
    return () => {
      disconnectSocket()
    }
  }, [roomId])

  useEffect(() => {
    receiveMessage(({ message }) => {
      setMessageList((prev) => [
        ...prev,
        {
          id: message.id,
          body: message.body,
          isMine: message.userId === currentUser?.id,
          created_at: message.created_at,
        },
      ])
    })
  }, [])

  useEffect(() => {
    const token = getItem('token')
    const fetchRoomData = async () => {
      try {
        const res = await apiClient.get(`/rooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const otherUser = res.data.room.room_users.find(
          (roomUser: roomUser) => roomUser.user.id !== currentUser?.id
        )?.user

        setOtherUser(otherUser)
      } catch (error) {
        console.error('Failed to fetch room data:', error)
      }
    }
    if (token) fetchRoomData()
  }, [roomId, currentUser?.id])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || currentUser?.id === undefined) return

    const createMessageArgs = {
      body: inputMessage,
      roomId: roomId,
      userId: currentUser.id,
    }
    try {
      const res = await apiClient.post('/messages', createMessageArgs)
      sendMessage({
        message: {
          ...res.data.message,
          roomId: roomId,
          userId: currentUser.id,
        },
      })
    } catch (error) {
      console.error('Failed to send message:', error)
    }
    setInputMessage('') // メッセージ送信後、入力フィールドをクリア
  }

  return (
    <>
      <TopNav />
      <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <div>
          <h3>チャット相手: {otherUser?.name ?? '不明'}</h3>
          <div
            style={{
              height: '300px',
              overflowY: 'scroll',
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            {messageList.map((msg) => (
              <p key={msg.id}>{msg.body}</p>
            ))}
          </div>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="メッセージを入力"
            style={{ padding: '10px', width: '80%' }}
            disabled={!currentUser}
          />
          <button
            onClick={handleSendMessage}
            style={{ padding: '10px', marginLeft: '10px' }}
            disabled={!currentUser}
          >
            送信
          </button>
        </div>
      </Container>
    </>
  )
}

export default ChatClient
