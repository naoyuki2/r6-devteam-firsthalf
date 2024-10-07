import { Request } from './request.entity'
import { itemSerializer } from '../item/itemSerializer'
import { userSerializer } from '../user/user.serializer'

export const requestSerializer = (request: Request) => ({
  id: request.id,
  title: request.title,
  location_prefecture: request.location_prefecture,
  location_details: request.location_details,
  delivery_location: request.delivery_location,
  delivery_date: request.delivery_date,
  description: request.description,
  status: request.status,
  completed_at: request.completed_at,
  created_at: request.created_at,
  updated_at: request.updated_at,
  user: userSerializer(request.user),
  items: request.items.map((item) => itemSerializer(item)),
})
