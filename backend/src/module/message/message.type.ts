import { messageSerializer } from './message.serializer'

const root = '/messages'

export const CreateEndpoint = root
export const GetByIdEndpoint = `${root}/:id`

export type CreateReq = {
  body: string
  roomId: string
  userId: number
}

export type CreateRes = {
  message: ReturnType<typeof messageSerializer>
}

export type GetByIdParam = {
  id: string
}

export type GetByIdRes = {
  messages: ReturnType<typeof messageSerializer>[]
}
