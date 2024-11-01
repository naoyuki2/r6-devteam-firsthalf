'use client'
import { apiClient } from '@/lib/axios'
import { useCurrentUser } from '@/lib/jotai/userState'
import { getItem } from '@/utils/localStorage'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

let socket: Socket | undefined

const ChatClient = ({ roomId }: { roomId: string }) => {
  const currentUser = useCurrentUser()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<string[]>([])
  const [roomData, setRoomData] = useState<JSON | null>(null)
  const [otherUser, setOtherUser] = useState<{
    id: number
    name: string
  } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getItem('token')
        const resRoom = await apiClient.get(`/rooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRoomData(resRoom.data.room)

        const roomUsers = resRoom.data.room.room_users
        const otherUserInfo = roomUsers.find(
          (roomUser: any) => roomUser.user.id !== currentUser?.id
        )

        if (otherUserInfo) {
          setOtherUser({
            id: otherUserInfo.user.id,
            name: otherUserInfo.user.name,
          })
        }
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error)
      }
    }

    fetchData()

    socket = io('http://localhost:3030')

    // ルームに参加
    socket.emit('joinRoom', { roomId })

    // サーバーからメッセージを受け取る
    socket.on('message', (message: string) => {
      setChat((prevChat) => [...prevChat, message])
    })

    return () => {
      socket?.disconnect()
    }
  }, [roomId, currentUser])

  // メッセージを送信する関数
  const sendMessage = () => {
    if (message.trim() && socket && currentUser?.name) {
      const userName = currentUser.name
      socket.emit('sendMessage', { roomId, message, userName })
      setChat((prevChat) => [...prevChat])
      setMessage('') // 入力をクリア
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
        onClick={sendMessage}
        style={{ padding: '10px', marginLeft: '10px' }}
        disabled={!currentUser}
      >
        送信
      </button>
    </div>
  )
}

export default ChatClient
