import { DraftItem } from './draft_item.entity'

export const draftItemSerializer = (draft_item: DraftItem) => ({
  id: draft_item.id,
  name: draft_item.name,
  quantity: draft_item.quantity,
  price: draft_item.price,
})
