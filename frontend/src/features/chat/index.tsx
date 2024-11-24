'use client'

import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/lib/jotai/userState'
import { disconnectSocket, receiveMessage, joinRoom } from '@/utils/socket'
import TopNav from '@/component/TopNav'
import {
  Container,
  Spinner,
  Row,
  Col,
  Button,
  ListGroup,
} from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons'
import { MessageList, Room } from '@/types'
import { handleSendMessage } from './utils'
import { ChatMessage } from '@/component/ChatMessage'
import { useDraftRequest } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { AppTextArea } from '@/component/AppTextArea'
import { AppButton } from '@/component/AppButton'

const TaskStatus = () => {
  return (
    <Container fluid className="pt-4" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3 border-start border-info border-5 ps-3 fw-bold">
            やること
          </h5>
          <ListGroup className="list-unstyled">
            <ListGroup.Item className="border-0 p-0">
              <span className="">1.</span>
              右上のアイコンから依頼を確認して、不都合な点がないかチャットでやり取りしましょう。（依頼者は必要に応じて依頼を更新しましょう。）
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <span className="">2.</span>
              不都合な点が解消されたら、合意ボタンを押しましょう。（※依頼者と運び手がともに合意ボタンを押すと依頼が締結されます。）
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <span className="">3.</span>
              依頼が確定されたら、受け渡し日時・場所などをチャットでやり取りしましょう。
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <span className="">4.</span>
              商品の受け渡しが終了したら、下から取引相手の評価をしましょう。
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5 className="mb-3 border-start border-info border-5 ps-3 fw-bold">
            ユーザーのステータス
          </h5>
          <ListGroup>
            <ListGroup.Item
              className="d-flex align-items-center justify-content-between mb-3"
              style={{
                border: '1px solid #000',
                borderRadius: '10px',
                padding: '16px',
              }}
            >
              <div className="d-flex align-items-center">
                <PersonFill
                  size={40}
                  className="me-3 text-secondary"
                  style={{ backgroundColor: '#e9ecef', borderRadius: '50%' }}
                />
                <div>
                  <div className="fw-bold">テストAさん</div>
                  <div className="text-muted">依頼者</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-3">合意していません</span>
                <Button variant="outline-success">合意</Button>
              </div>
            </ListGroup.Item>

            <ListGroup.Item
              className="d-flex align-items-center justify-content-between mb-3"
              style={{
                border: '1px solid #000',
                borderRadius: '10px',
                padding: '16px',
              }}
            >
              <div className="d-flex align-items-center">
                <PersonFill
                  size={40}
                  className="me-3 text-secondary"
                  style={{ backgroundColor: '#e9ecef', borderRadius: '50%' }}
                />
                <div>
                  <div className="fw-bold">テストBさん</div>
                  <div className="text-muted">運び手</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-3">合意していません</span>
                <Button
                  variant="outline-success"
                  style={{ visibility: 'hidden', borderRadius: '20px' }}
                >
                  合意
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

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
      <TaskStatus />
      <Container className="vh-100 d-flex flex-column">
        <div style={{}}>
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
