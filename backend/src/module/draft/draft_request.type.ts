import { draft_requestSerializer } from './draft_request.serializer'

const root = '/draft_requests'

export const CreateByIdEndpoint = `${root}/:id`

export type CreateByIdParam = {
  requestId: number
}

export type CreateByIdRes = {
  draft_request: ReturnType<typeof draft_requestSerializer>
}
