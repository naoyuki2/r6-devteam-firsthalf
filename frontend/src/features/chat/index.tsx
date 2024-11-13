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

type roomUser = {
  user: User
}

const ChatClient = ({ roomId }: { roomId: string }) => {
  const currentUser = useCurrentUser()
  const [inputMessage, setInputMessage] = useState<string>('')
  const [messageList, setMessageList] = useState<string[]>([])
  const [otherUser, setOtherUser] = useState<User>()
  const token = getItem('token')

  useEffect(() => {
    joinRoom(roomId)
    return () => {
      disconnectSocket()
    }
  }, [roomId])

  useEffect(() => {
    receiveMessage((message) => {
      setMessageList((prevChat) => [...prevChat, message])
    })
  }, [])

  useEffect(() => {
    if (token) fetchRoomData()
  }, [roomId, currentUser?.id])

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

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || currentUser?.id === undefined) return

    const args = {
      body: inputMessage,
      roomId: roomId,
      userId: currentUser.id,
    }
    try {
      const res = await apiClient.post('/messages', args)
      sendMessage({ message: res.data.message })
    } catch (error) {
      console.error('Failed to send message:', error)
    }
    setInputMessage('') // メッセージ送信後、入力フィールドをクリア
  }

  return (
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
        {messageList.map((msg, index) => (
          <p key={index}>{msg}</p>
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
  )
}

export default ChatClient
