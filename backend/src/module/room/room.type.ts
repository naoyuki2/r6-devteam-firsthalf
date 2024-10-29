import { RoomUser } from '../room_user/room_user.entity'

const root = '/rooms'

export const CreateEndpoint = root

export type CreateReq = {
  requestId: number
  requestUserId: number
}

export type CreateRes = {
  createRoomId: string
  requestId: number
  createRoomUser: RoomUser[]
}
