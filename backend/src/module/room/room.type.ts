const root = '/rooms'

export const CreateEndpoint = root

export type CreateReq = {
  requestId: number
  requestUserId: number
}

export type CreateRes = {
  createRoomId: string
}
