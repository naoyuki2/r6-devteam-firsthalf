import { AppDataSource } from '../../app-data-source'
import { RoomUser } from '../room_user/room_user.entity'
import { Room } from './room.entity'

const roomRepository = AppDataSource.getRepository(Room)
const roomUserRepository = AppDataSource.getRepository(RoomUser)

type GetByRoomIdProps = {
  id: string
}

type GetByRoomUserIdProps = {
  userId: number
}

type CreateProps = {
  requestId: number
}

export class RoomService {
  async getByRoom({ id }: GetByRoomIdProps): Promise<Room> {
    return await roomRepository.findOneOrFail({
      where: { id: id },
    })
  }

  async getByRoomUser({ userId }: GetByRoomUserIdProps): Promise<RoomUser[]> {
    return await roomUserRepository.find({
      where: { user: { id: userId } },
    })
  }

  async create({ requestId }: CreateProps): Promise<Room> {
    const createRoom = roomRepository.create({
      request: { id: requestId },
    })

    return await roomRepository.save(createRoom)
  }
}
