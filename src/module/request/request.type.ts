import { Request } from './request.entity'
import { User } from '../user/user.entity'
const root = '/api/requests'

export namespace GetAll {
  export const endpoint = root

  export type res = {
    requests: any
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
