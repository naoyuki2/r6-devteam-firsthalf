import { notificationSerializer } from './notification.serializer'

const root = '/notification'

export const GetEndpoint = root

export type GetRes = {
  notifications: ReturnType<typeof notificationSerializer>[]
}

export const ViewEndpoint = root

export type ViewRes = {
  notifications: ReturnType<typeof notificationSerializer>[]
}

export const CreateEndpoint = `${root}/:roomId`

export type GetByRoomIdParam = {
  roomId: string
}

export type CreateReq = {
  body: string | undefined
  type: 'room' | 'message'
}

export type CreateRes = {
  notification: unknown
}
