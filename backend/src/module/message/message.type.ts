import { messageSerializer } from './message.serializer'

const root = '/messages'

export const CreateEndpoint = root

export type CreateReq = {
  body: string
  roomId: string
  userId: number
}

export type CreateRes = {
  message: ReturnType<typeof messageSerializer>
}
