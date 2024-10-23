import { AppDataSource } from '../../app-data-source'
import { Room } from './room.entity'

const roomRepository = AppDataSource.getRepository(Room)

type CreateRoomProps = {
  requestId: number
}

export class RoomService {
  async createRoom({ requestId }: CreateRoomProps): Promise<Room> {
    const createRoom = roomRepository.create({
      request: { id: requestId },
    })

    return await roomRepository.save(createRoom)
  }
}
