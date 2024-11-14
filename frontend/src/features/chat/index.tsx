'use client'

import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/lib/jotai/userState'
import { disconnectSocket, receiveMessage, joinRoom } from '@/utils/socket'
import TopNav from '@/component/TopNav'
import { Container, Spinner } from 'react-bootstrap'
import { MessageList } from '@/types'
import { AppAlert } from '@/component/AppAlert'
import { useRoom } from './hooks'
import { handleSendMessage } from './utils'

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
            onClick={() =>
              handleSendMessage({
                inputMessage,
                roomId: room.id,
                currentUser,
                setInputMessage,
              })
            }
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
