import { AppDataSource } from '../../app-data-source'
import { DraftRequestService } from '../draft_request/draft_request.service'
import { Request } from '../request/request.entity'
import { RequestService } from '../request/request.service'
import { RoomService } from '../room/room.service'
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

type AgreedProps = {
  currentRoomUser: RoomUser
  otherRoomUser: RoomUser
}

export class RoomUserService {
  private requestService = new RequestService()
  private roomService = new RoomService()
  private draftRequestService = new DraftRequestService()
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

  async checkAgreed({
    currentRoomUser,
    otherRoomUser,
  }: AgreedProps): Promise<boolean> {
    if (!currentRoomUser.isAgreed) {
      currentRoomUser.isAgreed = true
      await roomUserRepository.save(currentRoomUser)
    }
    if (currentRoomUser.isAgreed && otherRoomUser.isAgreed) return true

    return false
  }

  async conclusion({ roomId }: { roomId: string }): Promise<Request> {
    const draftRequest = await this.draftRequestService.get(roomId)
    const { request } = await this.roomService.getByRoomId({ id: roomId })

    const updatedRequest = await this.requestService.conclusion({
      request,
      draftRequest,
    })

    await this.draftRequestService.delete(roomId)

    return updatedRequest
  }
}
