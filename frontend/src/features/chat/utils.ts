import { apiClient } from '@/lib/axios'
import { User } from '@/lib/jotai/userState'
import { sendMessage } from '@/utils/socket'

export const formatChatDate = (dateString: Date) => {
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

type HandleSendMessageProps = {
  inputMessage: string
  roomId: string
  currentUser: User | null
}

export const handleSendMessage = async ({
  inputMessage,
  roomId,
  currentUser,
}: HandleSendMessageProps) => {
  if (inputMessage.trim() === '' || currentUser?.id === undefined) return

  const createMessageArgs = {
    body: inputMessage,
    roomId: roomId,
    userId: currentUser.id,
  }
  try {
    const res = await apiClient.post('/messages', createMessageArgs)
    sendMessage({
      message: {
        ...res.data.message,
        roomId: roomId,
        userId: currentUser.id,
      },
    })
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}
