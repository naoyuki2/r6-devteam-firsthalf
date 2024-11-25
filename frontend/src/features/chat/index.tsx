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
<<<<<<< HEAD
import TodoList from '@/component/TodoList '
=======
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons'
>>>>>>> a22b5b224f4395ac97802098dffcce0ab53d93b6

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
            text="メッセージを送信する" // ボタンのテキストをtextプロパティで指定
            onClick={async () => {
              await handleSendMessage({
                inputMessage,
                roomId: room.id,
                currentUser,
              })
              setInputMessage('') // 入力内容をクリア
            }}
            className="text-info bg-light border border-info mt-3"
            style={{ padding: '10px', width: '100%' }}
            disabled={!currentUser}
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
          <p className="border-start border-info border-5 ps-2 fw-bold mt-4">
            取引相手の評価
          </p>
          <div className="d-flex justify-content-start mb-3">
            <label htmlFor="success" className="btn btn-outline-success">
              <HandThumbsUp className="me-2"></HandThumbsUp>良かった
            </label>
            <input
              type="radio"
              name="evaluation"
              id="success"
              className="invisible"
            />
            <label htmlFor="danger" className="btn btn-outline-danger">
              <HandThumbsDown className="me-2"></HandThumbsDown>悪かった
            </label>
            <input
              type="radio"
              name="evaluation"
              id="danger"
              className="invisible"
            />
          </div>
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
            text="評価を送信する" // ボタンのテキストをtextプロパティで指定
            onClick={async () => {
              await handleSendMessage({
                inputMessage,
                roomId: room.id,
                currentUser,
              })
              setInputMessage('') // 入力内容をクリア
            }}
            className="text-info bg-light border border-info mt-3"
            style={{ padding: '10px', width: '100%' }}
            disabled={!currentUser}
          />
        </div>
      </Container>
    </>
  )
}

export default ChatClient
