import { RoomUser } from '../room_user/room_user.entity'
import { room_userSerializer } from '../room_user/room_user.serializer'
import { Room } from './room.entity'

export const roomSerializer = (
  room: Room,
  otherUser: RoomUser,
  currentUser: RoomUser,
) => ({
  id: room.id,
  created_at: room.created_at,
  isClosed: room.isClosed,
  otherUser: {
    ...room_userSerializer(otherUser),
  },
  currentUser: {
    ...room_userSerializer(currentUser),
  },
})
