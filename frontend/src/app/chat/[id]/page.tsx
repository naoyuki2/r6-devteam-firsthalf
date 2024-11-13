import ChatClient from '@/features/chat'
import { joinRoom } from '@/utils/socket'

export default function Chat({ params }: { params: { id: string } }) {
  joinRoom({ roomId: params.id })
  return <ChatClient roomId={params.id} />
}
