import { AppDataSource } from '../../app-data-source'
import { Room } from '../room/room.entity'
import { User } from '../user/user.entity'
import { Message } from './message.entity'

type CreateProps = {
  body: string
  roomId: string
  userId: number
}

const messageRepository = AppDataSource.getRepository(Message)
const userRepository = AppDataSource.getRepository(User)
const roomRepository = AppDataSource.getRepository(Room)

export class MessageService {
  async create({ body, roomId, userId }: CreateProps): Promise<Message> {
    const user = await userRepository.findOneByOrFail({ id: userId })
    const room = await roomRepository.findOneByOrFail({ id: roomId })
    const createMessage = messageRepository.create({
      body,
      room,
      user,
    })

    return messageRepository.save(createMessage)
  }
}
