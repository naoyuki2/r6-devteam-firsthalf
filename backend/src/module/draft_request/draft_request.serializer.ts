import { DraftItem } from '../draft_item/draft_item.entity'
import { draftItemSerializer } from '../draft_item/draft_item.serializer'
import { DraftRequest } from './draft_request.entity'

export const draft_requestSerializer = (request: DraftRequest) => ({
  id: request.id,
  title: request.title,
  location_prefecture: request.location_prefecture,
  location_details: request.location_details,
  delivery_prefecture: request.delivery_prefecture,
  delivery_details: request.delivery_details,
  description: request.description,
  status: request.status,
  completed_at: request.completed_at,
  created_at: request.created_at,
  updated_at: request.updated_at,
  draft_item: request.draft_items.map((draft_item: DraftItem) =>
    draftItemSerializer(draft_item),
  ),
  roomId: request.room.id,
})
