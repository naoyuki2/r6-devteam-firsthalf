import { Item } from './item.entity'

export const itemSerializer = (item: Item) => ({
  id: item.id,
  name: item.name,
  quantity: item.quantity,
  price: item.price,
})
