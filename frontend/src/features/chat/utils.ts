import { apiClient } from '@/lib/axios'
import { User } from '@/lib/jotai/userState'
import { sendMessage } from '@/utils/socket'

type HandleSendMessageProps = {
  inputMessage: string
  roomId: string
  currentUser: User | null
  setInputMessage: (input: string) => void
}

export const handleSendMessage = async ({
  inputMessage,
  roomId,
  currentUser,
  setInputMessage,
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
  setInputMessage('')
}
