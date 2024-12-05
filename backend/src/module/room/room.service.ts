import { AppDataSource } from '../../app-data-source'
import { RoomUser } from '../room_user/room_user.entity'
import { Room } from './room.entity'

const roomRepository = AppDataSource.getRepository(Room)
const roomUserRepository = AppDataSource.getRepository(RoomUser)

type GetByRequestIdProps = {
  requestId: number
}

type CreateProps = {
  requestId: number
}

export class RoomService {
  async getByRoomId(roomId: string): Promise<Room> {
    return await roomRepository.findOneOrFail({
      where: { id: roomId },
      relations: [
        'room_users',
        'room_users.user',
        'request',
        'request.items',
        'request.user',
        'messages',
        'messages.user',
      ],
      order: {
        messages: {
          created_at: 'ASC',
        },
      },
    })
  }

  async getByUserId(userId: number): Promise<RoomUser[]> {
    return await roomUserRepository.find({
      where: { user: { id: userId } },
      relations: ['room'],
    })
  }

  async getByRequestId({
    requestId,
  }: GetByRequestIdProps): Promise<Room[] | undefined> {
    return await roomRepository.find({
      where: { request: { id: requestId } },
    })
  }

  async create({ requestId }: CreateProps): Promise<Room> {
    const createRoom = roomRepository.create({
      request: { id: requestId },
    })
    return await roomRepository.save(createRoom)
  }
}
