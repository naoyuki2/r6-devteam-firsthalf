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
    //travel側の作成時、多分壊れます
    const roomUsers = [
      {
        role: RoomUserRole.requester,
        id: requestUserId,
      },
      {
        role: RoomUserRole.carrier,
        id: currentUserId,
      },
    ]
    const createdRoomUsers: RoomUser[] = []
    for (const user of roomUsers) {
      const roomUser = roomUserRepository.create({
        role: user.role,
        room: { id: createRoomId },
        user: { id: user.id },
      })
      createdRoomUsers.push(roomUser)
    }
    await roomUserRepository.insert(createdRoomUsers) //saveメソッドだとupdate処理が走りエラーになるのでinsertを使ってます
    return createdRoomUsers
  }
}
