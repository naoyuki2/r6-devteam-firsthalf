import { draft_requestSerializer } from './draft_request.serializer'

const root = '/draft_requests'

export const CreateByIdEndpoint = `${root}/:roomId`

export type CreateByIdParam = {
  roomId: string
}

export type CreateByIdRes = {
  draft_request: ReturnType<typeof draft_requestSerializer>
}

export const RejectEndpoint = `${root}/:draftRequestId/reject`

export type RejectParam = {
  draftRequestId: number
}

export type RejectRes = {
  success: boolean
}
