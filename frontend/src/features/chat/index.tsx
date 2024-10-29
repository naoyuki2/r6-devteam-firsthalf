'use client'
import { apiClient } from '@/lib/axios'
import { getItem } from '@/utils/localStorage'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

let socket: Socket | undefined

const ChatClient = ({ roomId }: { roomId: string }) => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<string[]>([])
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getItem('token')
        const res = await apiClient.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUserName(res.data.user.name)
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error)
      }
    }

    fetchUser()

    socket = io('http://localhost:3030')

    // ルームに参加
    socket.emit('joinRoom', { roomId, userName })

    // サーバーからメッセージを受け取る
    socket.on('message', (message: string) => {
      setChat((prevChat) => [...prevChat, message])
    })

    return () => {
      socket?.disconnect()
    }
  }, [roomId, userName])

  // メッセージを送信する関数
  const sendMessage = () => {
    if (message.trim() && socket && userName) {
      // メッセージを送信（自分のメッセージも追加）
      socket.emit('sendMessage', { roomId, message, userName })
      setChat((prevChat) => [...prevChat])
      setMessage('') // 入力をクリア
    }
  }

  return (
    <div>
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
        disabled={!userName}
      />
      <button
        onClick={sendMessage}
        style={{ padding: '10px', marginLeft: '10px' }}
        disabled={!userName}
      >
        送信
      </button>
    </div>
  )
}

export default ChatClient
