import { AppDataSource } from '../../app-data-source'
import { Message } from './message.entity'

type CreateProps = {
  body: string
  roomId: string
  userId: number
}

const messageRepository = AppDataSource.getRepository(Message)

export class MessageService {
  async create({ body, roomId, userId }: CreateProps): Promise<Message> {
    const createMessage = messageRepository.create({
      body,
      room: { id: roomId },
      user: { id: userId },
    })

    return messageRepository.save(createMessage)
  }

  async getById(roomId: string): Promise<Message[]> {
    const qb = messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.room', 'room')
      .leftJoinAndSelect('message.user', 'user')
      .where('room.id = :roomId', { roomId })
      .orderBy('message.created_at', 'ASC')
    return await qb.getMany()
  }

  async getByRoomId(roomId: string): Promise<Message | null> {
    return await messageRepository.findOne({
      where: { room: { id: roomId } },
      order: { created_at: 'DESC' },
    })
  }
}
