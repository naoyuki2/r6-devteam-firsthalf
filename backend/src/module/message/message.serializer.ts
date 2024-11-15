import { Message } from './message.entity'

export const messageSerializer = (message: Message) => ({
  id: message.id,
  body: message.body,
  created_at: message.created_at,
  userId: message.user.id,
})
