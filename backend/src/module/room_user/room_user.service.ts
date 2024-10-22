import { AppDataSource } from '../../app-data-source'
import { role as RoomUserRole, RoomUser } from './room_user.entity'

const roomUserRepository = AppDataSource.getRepository(RoomUser)

type CreateRoomUserProps = {
  requestUserId: number
  currentUserId: number
  createRoomId: String
}

export class RoomUserService {
  async createRoomUser({
    requestUserId,
    currentUserId,
    createRoomId,
  }: CreateRoomUserProps): Promise<RoomUser[]> {
    const roomUsers = [
      {
        role: 'user',
        id: requestUserId,
      },
      {
        role: 'currentUser',
        id: currentUserId,
      },
    ]
    const createdRoomUsers: RoomUser[] = []
    for (const user of roomUsers) {
      const role =
        user.role === 'user' ? RoomUserRole.requester : RoomUserRole.carrier

      const roomUser = roomUserRepository.create({
        role: role,
        room: { id: createRoomId },
        user: { id: user.id },
      })
      await roomUserRepository.insert(roomUser) //saveメソッドだとupdate処理が走りエラーになるのでinsertを使ってます
      createdRoomUsers.push(roomUser)
    }
    return createdRoomUsers
  }
}
