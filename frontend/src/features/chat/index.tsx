'use client'

import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/lib/jotai/userState'
import { disconnectSocket, receiveMessage, joinRoom } from '@/utils/socket'
import TopNav from '@/component/TopNav'
import { Container, Spinner } from 'react-bootstrap'
import { MessageList, Room } from '@/types'
import { handleSendMessage } from './utils'
import { ChatMessage } from '@/component/ChatMessage'
import { useDraftRequest } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { AppTextArea } from '@/component/AppTextArea'
import { AppButton } from '@/component/AppButton'
import TodoList from '@/component/TodoList '

const ChatClient = ({ room }: { room: Room }) => {
  const currentUser = useCurrentUser()
  const [messageList, setMessageList] = useState<MessageList[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const roomId = room.id
  const { draftRequest, error, isLoading } = useDraftRequest(roomId)

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

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="ルームの取得に失敗しました" />
  return (
    <>
      <TopNav draftRequest={draftRequest} otherRole={room.otherUser.role} />
      <Container className="vh-100 d-flex flex-column">
        <div style={{}}>
          <TodoList />
          <ChatMessage
            messageList={messageList}
            roomId={room.id}
            setMessageList={setMessageList}
          />
        </div>
        <div
          style={{
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AppTextArea
            name="chatMessage"
            value={inputMessage}
            autoComplete="off"
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="メッセージを入力"
            style={{
              flex: 1,
              padding: '10px',
              marginRight: '10px',
              width: '100%',
            }}
            rows={4}
            disabled={!currentUser}
          />
          <AppButton
            text="送信" // ボタンのテキストをtextプロパティで指定
            onClick={async () => {
              await handleSendMessage({
                inputMessage,
                roomId: room.id,
                currentUser,
              })
              setInputMessage('') // 入力内容をクリア
            }}
            style={{ padding: '10px', width: '100%' }}
            disabled={!currentUser}
          />
        </div>
      </Container>
    </>
  )
}

export default ChatClient
