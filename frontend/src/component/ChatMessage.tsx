import { useEffect } from 'react'
import { useMessage } from '@/features/chat/hooks'
import { MessageList } from '@/types'
import { Spinner } from 'react-bootstrap'
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

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return (
      <AppAlert variant="danger" message="メッセージの取得に失敗しました" />
    )

  return (
    <div
      style={{
        height: '300px',
        overflowY: 'scroll',
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      {messageList.map((msg) => (
        <p key={msg.id}>{msg.body}</p>
      ))}
    </div>
  )
}
