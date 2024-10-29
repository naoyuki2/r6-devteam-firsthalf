import { AppDataSource } from '../../app-data-source'
import { RoomUser } from '../room_user/room_user.entity'
import { Room } from './room.entity'

const roomRepository = AppDataSource.getRepository(Room)

type GetByRoomIdProps = {
  id: string
}

type CreateProps = {
  requestId: number
}

export class RoomService {
  async getByRoom({ id }: GetByRoomIdProps): Promise<Room> {
    return await roomRepository.findOneOrFail({
      where: { id: id },
      relations: ['room_users', 'room_users.user', 'messages'],
    })
  }

  async create({ requestId }: CreateProps): Promise<Room> {
    const createRoom = roomRepository.create({
      request: { id: requestId },
    })

    return await roomRepository.save(createRoom)
  }
}
