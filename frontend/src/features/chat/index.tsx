'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/axios'
import { useCurrentUser } from '@/lib/jotai/userState'
import {
  disconnectSocket,
  receiveMessage,
  sendMessage,
  joinRoom,
} from '@/utils/socket'
import TopNav from '@/component/TopNav'
import { Container, Spinner } from 'react-bootstrap'
import { MessageList } from '@/types'
import { useRoom } from './utils'
import { AppAlert } from '@/component/AppAlert'

const ChatClient = ({ roomId }: { roomId: string }) => {
  const { room, error, isLoading } = useRoom(roomId)
  const currentUser = useCurrentUser()
  const [messageList, setMessageList] = useState<MessageList[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')

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
    setInputMessage('')
  }

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="ルームの取得に失敗しました" />

  return (
    <>
      <TopNav />
      <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <div>
          <h3>チャット相手: {room.otherUser.name ?? '不明'}</h3>
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
