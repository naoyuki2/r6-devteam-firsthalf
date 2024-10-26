import { Item } from '../item/item.entity'

const root = '/requests'

export const GetAllRequestsEndpoint = root

export type GetAllRequestsParam = {
  userId: number | undefined
}

export type GetAllRequestsRes = {
  requests: unknown
}

export const GetRequestByIdEndpoint = `${root}/:id`

export type GetRequestByIdParam = {
  id: number
}

export type GetRequestByIdRes = {
  request: unknown
}

// Create
export const CreateRequestEndpoint = root

export type CreateRequestReq = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending' | 'progress' | 'completed'
  items: Item[]
}

export type CreateRequestRes = {
  request: unknown
}
