'use client'

import { useState, useEffect } from 'react'
import {
  PersonCircle,
  ChatDotsFill,
  MegaphoneFill,
} from 'react-bootstrap-icons'
import { Notification } from '@/types'

// サンプルデータ
const fetchNotifications = async (): Promise<Notification[]> => {
  return [
    {
      id: 1,
      body: '右下のメッセージアイコンからルームを確認しましょう。',
      type: 'room',
      created_at: new Date(),
      roomId: 'room-123',
      isRead: false,
      user: {
        id: 1,
        name: '運日手太郎',
        email: 'user@example.com',
        iconImageUrl: '',
      },
    },
    {
      id: 2,
      body: '依頼を更新しました。右上のアイコンからご確認をお願いします。（このメッセージは自動送信されました。）',
      type: 'message',
      created_at: new Date(),
      roomId: 'room-456',
      isRead: true,
      user: {
        id: 2,
        name: '山田花子',
        email: 'hana@example.com',
        iconImageUrl: '',
      },
    },
  ]
}

export function NotificationsClient() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true)
      try {
        const data = await fetchNotifications()
        setNotifications(data)
      } catch (error) {
        console.error('通知データの取得に失敗しました:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotifications()
  }, [])

  if (isLoading) {
    return <p style={{ padding: '16px' }}>読み込み中...</p>
  }

  if (!notifications.length) {
    return <p style={{ padding: '16px' }}>通知はありません。</p>
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflowY: 'auto',
        maxHeight: '100vh',
        backgroundColor: '#f8f9fa',
        paddingTop: '60px',
      }}
    >
      <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="p-3 border-bottom bg-white"
            style={{
              padding: '16px',
              textAlign: 'left',
              borderBottom: '1px solid #000',
            }}
          >
            {/* アイコン */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              {/* 通知アイコン */}
              <div
                style={{
                  fontSize: '1.5rem',
                  marginRight: '8px',
                  color: notification.type === 'room' ? '#F39C12' : '#27AE60',
                }}
              >
                {notification.type === 'room' ? (
                  <MegaphoneFill />
                ) : (
                  <ChatDotsFill />
                )}
              </div>
              {/* ユーザーアイコン */}
              <div
                style={{
                  fontSize: '1.5rem',
                  color: '#6c757d',
                }}
              >
                <PersonCircle />
              </div>
            </div>

            {/* テキスト部分 */}
            <div>
              <p className="mb-1">
                <span className="fw-bold">{notification.user.name}</span>
                さん
                {notification.type === 'room'
                  ? 'があなたとチャットを開始しました。'
                  : 'からメッセージを受け取りました。'}
              </p>
              <p
                className="mb-0"
                style={{
                  whiteSpace: 'pre-wrap',
                  color: '#6c757d',
                }}
              >
                {notification.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
