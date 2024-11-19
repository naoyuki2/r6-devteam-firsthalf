'use client'

import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/lib/jotai/userState'
import { disconnectSocket, receiveMessage, joinRoom } from '@/utils/socket'
import TopNav from '@/component/TopNav'
import { Container } from 'react-bootstrap'
import { MessageList, Room } from '@/types'
import { handleSendMessage } from './utils'
import { ChatMessage } from '@/component/ChatMessage'

const ChatClient = ({ room }: { room: Room }) => {
  const currentUser = useCurrentUser()
  const [messageList, setMessageList] = useState<MessageList[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const roomId = room.id

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
  }, [currentUser?.id])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      handleSendMessage({
        inputMessage,
        roomId: room.id,
        currentUser,
      })
      setInputMessage('')
    }
  }

  return (
    <>
      <TopNav />
      <Container className="vh-100 d-flex flex-column">
        {/* チャットメッセージ */}
        <div style={{ flex: 1, paddingBottom: '70px' }}>
          {' '}
          {/* 下に余白を追加 */}
          <ChatMessage
            messageList={messageList}
            roomId={room.id}
            setMessageList={setMessageList}
          />
        </div>

        {/* メッセージ入力欄 */}
        <div
          style={{
            position: 'fixed', // 画面下部に固定
            bottom: 0,
            left: 0,
            width: '100%',
            borderTop: '1px solid #ddd',
            backgroundColor: 'white',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Enterキー送信を追加
            placeholder="メッセージを入力"
            style={{ flex: 1, padding: '10px', marginRight: '10px' }}
            disabled={!currentUser}
          />
          <button
            onClick={async () => {
              await handleSendMessage({
                inputMessage,
                roomId: room.id,
                currentUser,
              })
              setInputMessage('')
            }}
            style={{ padding: '10px' }}
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
