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

export const FeedbackEndpoint = '/feedback/:roomId'

export type FeedbackParam = {
  roomId: string
}

export type FeedbackRes = {
  success: boolean
}
