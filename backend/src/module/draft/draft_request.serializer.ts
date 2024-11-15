import { Item } from '../item/item.entity'
import { itemSerializer } from '../item/itemSerializer'
import { userSerializer } from '../user/user.serializer'

export const draft_requestSerializer = (request: any) => ({
  //DraftRequestにのちのち変更
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
  user: userSerializer(request.user),
  items: request.items.map((item: Item) => itemSerializer(item)),
  roomId: request.roomId,
})
