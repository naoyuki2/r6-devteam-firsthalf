import { RoomUser } from '../room_user/room_user.entity'

const root = '/rooms'

export const CreateRoomEndpoint = root

export type CreateRoomReq = {
  requestId: number
  requestUserId: number
}

export type CreateRoomRes = {
  createRoomId: string
  requestId: number
  createRoomUser: RoomUser[]
}
