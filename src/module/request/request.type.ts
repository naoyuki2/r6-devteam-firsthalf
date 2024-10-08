import { Item } from '../item/item.entity'
import { Request } from './request.entity'

const root = '/api/requests'

export namespace GetAll {
  export const endpoint = root

  export type res = {
    requests: Request[]
  }
}

export namespace GetById {
  export const endpoint = `${root}/:id`
  export type param = {
    id: number
  }

  export type res = {
    request: Request
  }
}

export namespace Create {
  export const endpoint = root

  export type req = {
    title: string
    location_prefecture: string
    location_details: string
    delivery_location: string
    delivery_date: string
    description: string
    userId: number
    items: Item[]
  }

  export type res = {
    request: any
  }
}
