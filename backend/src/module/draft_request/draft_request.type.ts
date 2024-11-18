import { draft_requestSerializer } from './draft_request.serializer'

const root = '/draft_requests'

export const CreateByIdEndpoint = `${root}/:roomId`

export type CreateByIdParam = {
  roomId: string
}

export type CreateByIdRes = {
  draft_request: ReturnType<typeof draft_requestSerializer>
}

export const RejectEndpoint = `${root}/:requestId/reject`

export type RejectParam = {
  requestId: number
}

export type RejectRes = {
  success: boolean
}

export const ApproveEndpoint = `${root}/:roomId/approve`

export type ApproveParam = {
  roomId: string
}

export type ApproveRes = {
  draft_request: ReturnType<typeof draft_requestSerializer>
}
