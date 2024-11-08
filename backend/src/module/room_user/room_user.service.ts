import { AppDataSource } from '../../app-data-source'
import { role as RoomUserRole, RoomUser } from './room_user.entity'

const roomUserRepository = AppDataSource.getRepository(RoomUser)

type CreateProps = {
  requestUserId: number
  currentUserId: number
  createRoomId: string
}

type GetByRoomUserProps = {
  roomId: string
  userId: number
}

export class RoomUserService {
  async create({
    requestUserId,
    currentUserId,
    createRoomId,
  }: CreateProps): Promise<RoomUser[]> {
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

  async getByRoomUser({
    roomId,
    userId,
  }: GetByRoomUserProps): Promise<RoomUser | null> {
    return await roomUserRepository.findOne({
      where: { user: { id: userId }, room: { id: roomId } },
    })
  }
}
