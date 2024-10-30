import { Message } from './message.entity'

export const messageSerializer = (message: Message) => ({
  id: message.id,
  body: message.body,
})
