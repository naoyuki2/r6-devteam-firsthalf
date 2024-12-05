import { Item } from '../item/item.entity'
import { requestSerializer } from './request.serializer'

const root = '/requests'

export const GetEndpoint = root

export type GetQuery = {
  filter: {
    status?: 'pending' | 'progress' | 'completed'
    userId?: number
    location_prefecture?: string
    delivery_prefecture?: string
  }
}

export type GetRes = {
  requests: ReturnType<typeof requestSerializer>[]
}

export const GetByIdEndpoint = `${root}/:requestId`

export type GetByIdParam = {
  requestId: number
}

export type GetByIdRes = {
  request: unknown
}

export const CreateEndpoint = root

export type CreateReq = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending' | 'agreed' | 'received' | 'completed'
  items: Item[]
}

export type CreateRes = {
  request: unknown
}

export const AgreedEndpoint = `${root}/:requestId/agreed`

export type AgreedParam = {
  requestId: number
}

export type AgreedRes = {
  request: ReturnType<typeof requestSerializer>
}

export const ReceivedEndpoint = `${root}/:requestId/received`

export type ReceivedParam = {
  requestId: number
}

export type ReceivedRes = {
  request: ReturnType<typeof requestSerializer>
}

export const ConcludedEndpoint = `${root}/:draftRequestId/:requestId/concluded`

export type ConcludedParam = {
  draftRequestId: number
  requestId: number
}

export type ConcludedRes = {
  request: ReturnType<typeof requestSerializer>
}

export const CompletedEndpoint = `${root}/:requestId/completed`

export type CompletedParam = {
  requestId: number
}

export type CompletedRes = {
  request: ReturnType<typeof requestSerializer>
}
