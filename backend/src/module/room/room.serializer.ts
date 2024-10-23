import { messageSerializer } from '../message/message.serializer'
import { requestSerializer } from '../request/request.serializer'
import { room_userSerializer } from '../room_user/room_user.serializer'
import { Room } from './room.entity'

export const roomSerializer = (room: Room) => ({
  id: room.id,
  created_at: room.created_at,
  isClosed: room.isClosed,
  request: requestSerializer(room.request),
  room_users: room.room_users.map((room_user) =>
    room_userSerializer(room_user),
  ),
  messages: room.messages.map((message) => messageSerializer(message)),
})
