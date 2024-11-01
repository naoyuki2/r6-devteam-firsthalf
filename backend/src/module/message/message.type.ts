import { messageSerializer } from './message.serializer'

const root = '/messages'

export const CreateEndpoint = root

export type CreateReq = {
  body: string
  roomId: string
}

export type CreateRes = {
  message: ReturnType<typeof messageSerializer>
}
