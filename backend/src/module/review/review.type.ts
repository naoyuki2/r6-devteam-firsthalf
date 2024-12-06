import { role } from '../room_user/room_user.entity'
import { reviewSerializer } from './review.serializer'

const root = '/review'

export const CreateEndpoint = `${root}/:receiveUserId`

export type CreateParam = {
  receiveUserId: number
}

export type CreateReq = {
  body: string
  sendRole: role
  isGood: boolean
}

export const GetByIdEndpoint = `${root}/:userId`

export type GetByIdParam = {
  userId: number
}

export type GetByIdRes = {
  reviews: ReturnType<typeof reviewSerializer>[]
}
