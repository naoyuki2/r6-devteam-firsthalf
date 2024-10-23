import { roomSerializer } from '../room/room.serializer'
import { userSerializer } from '../user/user.serializer'
import { Message } from './message.entity'

export const messageSerializer = (message: Message) => ({
  id: message.id,
  body: message.body,
  created_at: message.created_at,
  user: userSerializer(message.user),
})
