import { AppDataSource } from '../../app-data-source'
import { Room } from './room.entity'

const roomRepository = AppDataSource.getRepository(Room)

type CreateProps = {
  requestId: number
}

export class RoomService {
  async create({ requestId }: CreateProps): Promise<Room> {
    const createRoom = roomRepository.create({
      request: { id: requestId },
    })

    return await roomRepository.save(createRoom)
  }
}
