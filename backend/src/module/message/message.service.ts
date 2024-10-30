import { AppDataSource } from '../../app-data-source'
import { Message } from './message.entity'

type CreateMessageProps = {
  body: string
  roomId: string
  userId: number
}

const messageRepository = AppDataSource.getRepository(Message)

export class MessageService {
  async create({ body, roomId, userId }: CreateMessageProps): Promise<Message> {
    const createMessage = messageRepository.create({
      body,
      room: { id: roomId },
      user: { id: userId },
    })

    return messageRepository.save(createMessage)
  }
}
