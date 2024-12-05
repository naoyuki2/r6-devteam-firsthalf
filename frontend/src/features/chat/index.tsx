'use client'

import { useEffect, useState } from 'react'
import {
  disconnectSocket,
  receiveMessage,
  joinRoom,
  onStatusUpdate,
  updateStatus,
} from '@/utils/socket'
import { Container } from 'react-bootstrap'
import { GetByRoomIdRes, Message, RoomUser } from '@/types'
import { ChatMessage } from './ChatMessage'
import { FeedbackForm } from './FeedbackForm'
import { UserStatus } from './UserStatus'
import { handleSendMessage } from './utils'
import { fetchWithToken } from '@/lib/axios'
import ChatTopNav from './ChatTopNav'
import { TodoList } from './TodoList'

const ChatClient = ({ room }: { room: GetByRoomIdRes }) => {
  const [messages, setMessages] = useState<Message[]>(room.messages)
  const [status, setStatus] = useState<string>(room.request.status)
  const [currentUser, setCurrentUser] = useState<RoomUser>(room.currentUser)

  const [showModal, setShowModal] = useState(false)
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    joinRoom({ roomId: room.id })
    onStatusUpdate((status: string) => {
      setStatus(status)
    })
    receiveMessage(({ message }: { message: Message }) => {
      setMessages((prev) => [...prev, message])
    })
    return () => {
      disconnectSocket()
    }
  }, [room.id])

  const sendMessage = async (inputMessage: string) => {
    await handleSendMessage({
      inputMessage,
      roomId: room.id,
      currentUser: currentUser.user,
    })
  }

  const handleAgree = async () => {
    const isConfirm = window.confirm('合意しますか？')
    if (!isConfirm) return

    const agreeRes = await fetchWithToken({
      method: 'PATCH',
      url: `/room_users/${room.id}/agreed`,
    })
    setCurrentUser((prev) => ({
      ...prev,
      isAgreed: true,
    }))
    if (!agreeRes?.data.isBothAgreed) return

    await fetchWithToken({
      method: 'PATCH',
      url: `/requests/${room.draftRequest.id}/${room.request.id}/concluded`,
    })

    await fetchWithToken({
      method: 'DELETE',
      url: `/draft_requests/${room.id}/delete`,
    })
    updateStatus({ status: 'agreed', roomId: room.id })
  }

  const handleReceive = async () => {
    const receiveRes = await fetchWithToken({
      method: 'PATCH',
      url: `/room_users/${room.id}/received`,
    })
    setCurrentUser((prev) => ({
      ...prev,
      isReceived: true,
    }))
    if (!receiveRes?.data.isBothReceived) return

    await fetchWithToken({
      method: 'PATCH',
      url: `/requests/${room.request.id}/received`,
    })
    updateStatus({ status: 'received', roomId: room.id })
  }

  const handleFeedback = async () => {
    const feedbackRes = await fetchWithToken({
      method: 'PATCH',
      url: `/room_users/${room.id}/feedback`,
    })
    setCurrentUser((prev) => ({
      ...prev,
      isFeedback: true,
    }))
    if (!feedbackRes?.data.success) return

    await fetchWithToken({
      method: 'PATCH',
      url: `/requests/${room.request.id}/completed`,
    })
    updateStatus({ status: 'completed', roomId: room.id })
  }

  return (
    <>
      <ChatTopNav
        draftRequest={
          room.request.status === 'pending' ? room.draftRequest : room.request
        }
        otherRole={room.otherUser.role}
        currentUser={currentUser.user}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        showModal={showModal}
      />
      <Container>
        <TodoList status={status} role={currentUser.role} />
        <UserStatus
          currentUser={currentUser}
          otherUser={room.otherUser}
          action={room.draftRequest.action}
          status={status}
          onAgree={handleAgree}
          onReceive={handleReceive}
          onSendMessage={sendMessage}
          onOpenModal={handleOpenModal}
        />
        <ChatMessage
          messages={messages}
          currentUserId={currentUser.user.id}
          onSendMessage={sendMessage}
        />
        <FeedbackForm onFeedback={handleFeedback} status={status} />
      </Container>
    </>
  )
}

export default ChatClient
