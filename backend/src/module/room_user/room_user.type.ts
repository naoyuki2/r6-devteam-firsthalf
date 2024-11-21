import { requestSerializer } from '../request/request.serializer'

export const AgreedEndpoint = '/agreed/:roomId'

export type AgreedParam = {
  roomId: string
}

export type AgreedRequestRes = {
  request: ReturnType<typeof requestSerializer>
}

export type AgreedUserRes = {
  isAgreed: boolean
}
