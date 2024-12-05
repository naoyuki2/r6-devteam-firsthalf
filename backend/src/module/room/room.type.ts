import { Room } from './room.entity'
import { getByRoomIdSerializer, roomSerializer } from './room.serializer'

const root = '/rooms'

export const GetByUserIdEndpoint = root

export type GetByUserIdRes = {
  rooms: ReturnType<typeof roomSerializer>[]
}

export const GetByRoomIdEndpoint = `${root}/:roomId`

export type GetByRoomIdParam = {
  roomId: string
}

export type GetByRoomIdRes = {
  room: ReturnType<typeof getByRoomIdSerializer>
}

export const CreateEndpoint = root

export type CreateReq = {
  requestId: number
}

export type CreateRes = {
  room: Room
}
