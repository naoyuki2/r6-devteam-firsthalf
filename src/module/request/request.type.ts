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
