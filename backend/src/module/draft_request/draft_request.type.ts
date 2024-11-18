import { DraftItem } from '../draft_item/draft_item.entity'
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

export const ProposeUpEndpoint = `${root}/:requestId/propose`

export type ProposeUpParam = {
  draftRequestId: number
}

export type ProposeUpRes = {
  draft_request: ReturnType<typeof draft_requestSerializer>
}

export type ProposeUpBody = {
  title: string | undefined
  location_prefecture: string | undefined
  location_details: string | undefined
  delivery_prefecture: string | undefined
  delivery_details: string | undefined
  description: string | undefined
  draft_items: DraftItem[] | undefined
}
