import { roomSerializer } from './room.serializer'

const root = '/rooms'

export const GetByIdEndpoint = root

export type GetByIdRes = {
  rooms: ReturnType<typeof roomSerializer>[]
}

export const CreateEndpoint = root

export type CreateReq = {
  requestId: number
  requestUserId: number
}

export type CreateRes = {
  createRoomId: string
}
