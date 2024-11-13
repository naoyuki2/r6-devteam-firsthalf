import { Item } from '../item/item.entity'
import { requestSerializer } from './request.serializer'

const root = '/requests'

export const GetEndpoint = root

export type GetQuery = {
  userId: number | undefined
}

export type GetRes = {
  requests: ReturnType<typeof requestSerializer>[]
}

export const GetByIdEndpoint = `${root}/:id`

export type GetByIdParam = {
  id: number
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
  status: 'pending' | 'progress' | 'completed'
  items: Item[]
}

export type CreateRes = {
  request: ReturnType<typeof requestSerializer>
}

export const UpdateEndpoint = root

export type UpdateReq = {
  requestId: number
  inputTitle: string | undefined
  inputLocation_prefecture: string | undefined
  inputLocation_details: string | undefined
  inputDelivery_prefecture: string | undefined
  inputDelivery_details: string | undefined
  inputDescription: string | undefined
  inputStatus: 'pending' | 'progress' | 'completed' | undefined
}

export type UpdateRes = {
  request: ReturnType<typeof requestSerializer>
}
