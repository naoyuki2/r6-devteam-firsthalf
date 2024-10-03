import { title } from 'process'
import { Request } from './request.entity'

export const RequestSerializer = (request: Request) => ({
  id: request.id,
  title: request.title,
  location_prefecture: request.location_prefecture,
  location_details: request.location_details,
  description: request.description,
  userId: request.user,
})
