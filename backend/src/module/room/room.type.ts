import { Room } from './room.entity'
import { roomSerializer } from './room.serializer'

const root = '/rooms'

export const GetByUserIdEndpoint = root

export type GetByUserIdRes = {
  rooms: ReturnType<typeof roomSerializer>[]
}

export const GetByRoomIdEndpoint = `${root}/:id`

export type GetByRoomIdParam = {
  id: string
}

export type GetByRoomIdRes = {
  room: ReturnType<typeof roomSerializer>
}

export const CreateEndpoint = root

export type CreateReq = {
  requestId: number
}

export type CreateRes = {
  room: Room
}
