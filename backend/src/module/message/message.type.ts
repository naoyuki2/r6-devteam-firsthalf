import { messageSerializer } from './message.serializer'

const root = '/message'

export const SendEndpoint = root

export type CreateReq = {
  body: string
  roomId: string
}

export type CreateRes = {
  message: ReturnType<typeof messageSerializer>
}
