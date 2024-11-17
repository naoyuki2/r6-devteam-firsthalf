import { DraftItem } from '../draft_item/draft_item.entity'
import { draft_requestSerializer } from './draft_request.serializer'

const root = '/draft_requests'

export const CreateByIdEndpoint = `${root}/:roomId`
export const ProposeUpEndpoint = `${root}/proposal/:requestId`

export type CreateByIdParam = {
  roomId: string
}

export type CreateByIdRes = {
  draft_request: ReturnType<typeof draft_requestSerializer>
}

export type ProposeUpParam = {
  requestId: number
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
