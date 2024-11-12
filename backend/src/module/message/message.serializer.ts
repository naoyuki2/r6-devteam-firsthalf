import { Message } from './message.entity'

export const messageSerializer = (message: Message) => ({
  id: message.id,
  body: message.body,
  created_at: message.created_at,
})

export const createMessageSerializer = (message: Message) => ({
  roomId: message.room.id,
  userName: message.user.name,
  body: message.body,
  created_at: message.created_at,
})
