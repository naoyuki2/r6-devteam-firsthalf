import { User } from './user.entity'

export const userSerializer = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  icon_image_url: user.icon_image_url,
})
