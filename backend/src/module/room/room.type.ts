import { RoomUser } from '../room_user/room_user.entity'
import { Message } from '../message/message.entity'
import { Request } from '../request/request.entity'
const root = '/rooms'

export const GetByIdEndpoint = root

export type GetByIdRes = {
  rooms: {
    id: string
    created_at: Date
    isClosed: boolean
    request: Request
    room_users: RoomUser[]
    messages: Message[]
  }[]
}

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
