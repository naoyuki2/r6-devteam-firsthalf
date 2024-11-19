import { useEffect } from 'react'
import { useMessage } from '@/features/chat/hooks'
import { MessageList } from '@/types'
import { Spinner, Image } from 'react-bootstrap'
import { AppAlert } from './AppAlert'
import { useCurrentUser } from '@/lib/jotai/userState'

type ChatMessageProps = {
  messageList: MessageList[]
  roomId: string
  setMessageList: React.Dispatch<React.SetStateAction<MessageList[]>>
}

export const ChatMessage = ({
  messageList,
  roomId,
  setMessageList,
}: ChatMessageProps) => {
  const { messages, error, isLoading } = useMessage(roomId)
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (messages) {
      const pastMessages = messages.map((message) => ({
        id: message.id,
        body: message.body,
        isMine: message.userId === currentUser?.id,
        created_at: message.created_at,
      }))

      setMessageList((prev) => [
        ...prev,
        ...pastMessages.filter(
          (newMsg) => !prev.some((prevMsg) => prevMsg.id === newMsg.id)
        ),
      ])
    }
  }, [messages, currentUser?.id, setMessageList])

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return date.toLocaleDateString('ja-JP', options)
  }

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return (
      <AppAlert variant="danger" message="メッセージの取得に失敗しました" />
    )

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* メッセージリスト */}
      <div
        style={{
          flex: 1,
          overflowY: 'scroll',
          border: '1px solid #ddd',
          padding: '10px',
        }}
      >
        {messageList.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.isMine ? 'flex-end' : 'flex-start',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: msg.isMine ? 'flex-end' : 'flex-start',
              }}
            >
              {!msg.isMine && (
                <Image
                  src="/path/to/other-icon.png"
                  roundedCircle
                  width={40}
                  height={40}
                  style={{ marginRight: '10px', alignSelf: 'center' }}
                />
              )}
              <div
                style={{
                  backgroundColor: msg.isMine ? '#4CAF50' : '#ddd',
                  color: msg.isMine ? 'white' : 'black',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  maxWidth: '100%', // メッセージボックスの最大幅を100%に変更
                  display: 'inline-block', // メッセージを横並びに
                  whiteSpace: 'normal', // 改行を許可
                  wordBreak: 'break-word', // 長い単語も改行を入れて表示
                }}
              >
                {msg.body}
              </div>
            </div>
            <div
              style={{
                fontSize: '0.8em',
                color: '#777',
                marginTop: '5px',
                textAlign: msg.isMine ? 'right' : 'left',
              }}
            >
              {formatDate(msg.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
