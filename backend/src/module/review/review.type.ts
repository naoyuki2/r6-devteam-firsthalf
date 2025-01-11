import { role } from '../room_user/room_user.entity'
import { reviewSerializer } from './review.serializer'

const root = '/reviews'

export const CreateEndpoint = `${root}/:receiveUserId`

export type CreateParam = {
  receiveUserId: number
}

export type CreateReq = {
  body: string
  sendUserRole: role
  isGood: boolean
}

export type CreateRes = {
  success: boolean
}

export const GetByIdEndpoint = `${root}/:userId`

export type GetByIdParam = {
  userId: number
}

export type GetByIdRes = {
  reviews: ReturnType<typeof reviewSerializer>[]
}
