import { Request } from './request.entity'
import { User } from '../user/user.entity'
import { Item } from '../item/item.entity'
const root = '/requests'

export namespace GetAll {
  export const endpoint = root

  export type res = {
    requests: any //エラーが起こるのでanyにしてます
  }
}

export namespace GetById {
  export const endpoint = (id?: number): string => {
    return id ? `${root}/${id}` : `${root}/:id`
  }
  export type param = {
    id: number
  }

  export type res = {
    request: any //エラーが起こるのでanyにしてます
  }
}

export namespace Create {
  export const endpoint = root

  export type req = {
    title: string
    location_prefecture: string
    location_details: string
    delivery_prefecture: string
    delivery_details: string
    description: string
    status: 'pending' | 'progress' | 'completed'
    items: Item[]
  }

  export type res = {
    request: any
  }
}
