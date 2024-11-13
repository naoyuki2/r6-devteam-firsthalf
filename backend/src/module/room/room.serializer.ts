import { User } from '../user/user.entity'
import { userSerializer } from '../user/user.serializer'
import { Room } from './room.entity'

export const roomSerializer = (room: Room, otherUser: User) => ({
  id: room.id,
  created_at: room.created_at,
  isClosed: room.isClosed,
  otherUser: userSerializer(otherUser),
})
