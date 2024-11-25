import { userSerializer } from '../user/user.serializer'
import { RoomUser } from './room_user.entity'

export const room_userSerializer = (room_user: RoomUser) => ({
  id: room_user.id,
  role: room_user.role,
  isAgreed: room_user.isAgreed,
  isReceived: room_user.isReceived,
  isFeedback: room_user.isFeedback,
  user: userSerializer(room_user.user),
})
