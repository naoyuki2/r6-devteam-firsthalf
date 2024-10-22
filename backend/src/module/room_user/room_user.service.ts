import { AppDataSource } from '../../app-data-source'
import { role as RoomUserRole, RoomUser } from './room_user.entity'

const roomUserRepository = AppDataSource.getRepository(RoomUser)

type CreateRoomUserProps = {
  roomUsers: { role: string; id: number }[]
  createRoomId: String
}

export class RoomUserService {
  async createRoomUser({
    roomUsers,
    createRoomId,
  }: CreateRoomUserProps): Promise<RoomUser[]> {
    const createdRoomUsers: RoomUser[] = []
    for (const user of roomUsers) {
      const role =
        user.role === 'user' ? RoomUserRole.requester : RoomUserRole.carrier
      const roomUser = roomUserRepository.create({
        role: role,
        room: { id: createRoomId },
        user: { id: user.id },
      })
      const saveRoomUser = await roomUserRepository.save(roomUser)
      createdRoomUsers.push(saveRoomUser)
    }
    return createdRoomUsers
  }
}
