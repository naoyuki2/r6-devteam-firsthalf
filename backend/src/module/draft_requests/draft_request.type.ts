const root = 'draft_requests'

export const getEndpoint = root
export const roomByIdEndpoint = `${root}/:id`

export type GetByIdParam = {
  id: number
}

export type GetByIdRes = {
  request: unknown
}
