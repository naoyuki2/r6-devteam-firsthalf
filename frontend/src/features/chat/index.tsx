'use client'

import TopNav from '@/component/TopNav'
import { useEffect, useState } from 'react'
import { disconnectSocket, receiveMessage, joinRoom } from '@/utils/socket'
import { Container } from 'react-bootstrap'
import { GetByRoomIdRes, Message } from '@/types'
import { ChatMessage } from './ChatMessage'
import { FeedbackForm } from './FeedbackForm'
import { UserStatus } from './UserStatus'
import { handleSendMessage } from './utils'
import { fetchWithToken } from '@/lib/axios'

const ChatClient = ({ room }: { room: GetByRoomIdRes }) => {
  const [messages, setMessages] = useState<Message[]>(room.messages)

  useEffect(() => {
    joinRoom({ roomId: room.id })
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
      currentUser: room.currentUser.user,
    })
  }

  const handleAgree = async () => {
    const isConfirm = window.confirm('合意しますか？')
    if (!isConfirm) return

    const agreeRes = await fetchWithToken({
      method: 'PATCH',
      url: `/room_users/${room.id}/agreed`,
    })

    if (!agreeRes?.data.isBothAgreed) return

    await fetchWithToken({
      method: 'PATCH',
      url: `/requests/${room.draftRequest.id}/${room.request.id}/concluded`,
    })
  }

  const handleReceive = async () => {
    const receiveRes = await fetchWithToken({
      method: 'PATCH',
      url: `/room_users/${room.id}/received`,
    })

    if (!receiveRes?.data.isBothReceived) return

    await fetchWithToken({
      method: 'PATCH',
      url: `/requests/${room.request.id}/received`,
    })
  }

  return (
    <>
      <TopNav
        draftRequest={room.draftRequest}
        otherRole={room.otherUser.role}
      />
      <Container>
        <UserStatus
          currentUser={room.currentUser}
          otherUser={room.otherUser}
          status={room.request.status}
          onAgree={handleAgree}
          onReceive={handleReceive}
        />
        <ChatMessage
          messages={messages}
          currentUserId={room.currentUser.user.id}
          onSendMessage={sendMessage}
        />
        <FeedbackForm />
      </Container>
    </>
  )
}

export default ChatClient
