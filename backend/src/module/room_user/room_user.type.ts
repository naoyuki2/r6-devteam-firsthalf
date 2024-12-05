import { requestSerializer } from '../request/request.serializer'

const root = '/room_users'

export const AgreedEndpoint = `${root}/:roomId/agreed`

export type AgreedParam = {
  roomId: string
}

export type AgreedRequestRes = {
  request: ReturnType<typeof requestSerializer>
}

export type AgreedUserRes = {
  isBothAgreed: boolean
}

export const ReceivedEndpoint = `${root}/:roomId/received`

export type ReceivedParam = {
  roomId: string
}

export type ReceivedRes = {
  isBothReceived: boolean
}

export const FeedbackEndpoint = `${root}/:roomId/feedback`

export type FeedbackParam = {
  roomId: string
}

export type FeedbackRes = {
  success: boolean
}
