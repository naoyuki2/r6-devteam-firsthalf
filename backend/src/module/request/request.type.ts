import { Item } from '../item/item.entity'

const root = '/requests'

export const GetEndpoint = root

export type GetQuery = {
  userId: number | undefined
}

export type GetRes = {
  requests: unknown
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
  request: unknown
}
