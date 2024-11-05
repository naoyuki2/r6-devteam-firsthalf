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
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<string[]>([])
  const [otherUser, setOtherUser] = useState<User>()

  useEffect(() => {
    //ページ更新時にjoinを行わないといけない
    joinRoom(roomId)
    return () => {
      disconnectSocket()
    }
  }, [roomId])

  useEffect(() => {
    const token = getItem('token') //useSWRだとlocalStorageでerror
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

    if (token) fetchRoomData()
  }, [roomId, currentUser?.id])

  useEffect(() => {
    receiveMessage((message) => {
      setChat((prevChat) => [...prevChat, message])
    })
  }, [])

  const handleSendMessage = () => {
    if (message.trim() && currentUser?.id) {
      sendMessage({
        roomId,
        body: message,
        userName: currentUser.name,
      })
      setMessage('')
    }
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
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
