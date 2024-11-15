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

  return (
    <>
      <TopNav />
      <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <div>
          <h3>チャット相手: {room.otherUser.name ?? '不明'}</h3>
          <ChatMessage messageList={messageList} roomId={room.id} setMessageList={setMessageList}/>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="メッセージを入力"
            style={{ padding: '10px', width: '80%' }}
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
