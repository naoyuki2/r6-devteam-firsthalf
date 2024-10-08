import { Request } from './request.entity'
import { User } from '../user/user.entity'
const root = '/api/requests'

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
