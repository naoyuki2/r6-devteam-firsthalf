import { RoomUser } from '../room_user/room_user.entity'
import { roomSerializer } from './room.serializer'
const root = '/rooms'

export const GetByUserIdEndpoint = root

export type GetByUserRes = {
  rooms: ReturnType<typeof roomSerializer>[]
}

export const CreateEndpoint = root

export type GetByRoomParam = {
  id: string
}

export type GetByRoomRes = {
  room: ReturnType<typeof roomSerializer>
}

export const GetByRoomIdEndpoint = `${root}/:id`

export type CreateReq = {
  requestId: number
  requestUserId: number
}

export type CreateRes = {
  createRoomId: string
  requestId: number
  createRoomUser: RoomUser[]
}
