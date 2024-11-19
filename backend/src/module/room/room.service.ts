import { AppDataSource } from '../../app-data-source'
import { RoomUser } from '../room_user/room_user.entity'
import { Room } from './room.entity'

const roomRepository = AppDataSource.getRepository(Room)
const roomUserRepository = AppDataSource.getRepository(RoomUser)

type GetByRoomIdProps = {
  id: string
}

type GetByUserIdProps = {
  userId: number
}

type GetByRequestIdProps = {
  requestId: number
}

type CreateProps = {
  requestId: number
}

export class RoomService {
  async getByRoomId({ id }: GetByRoomIdProps): Promise<Room> {
    return await roomRepository.findOneOrFail({
      where: { id: id },
      relations: ['room_users', 'room_users.user', 'request', 'request.items'],
    })
  }

  async getByUserId({ userId }: GetByUserIdProps): Promise<RoomUser[]> {
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
