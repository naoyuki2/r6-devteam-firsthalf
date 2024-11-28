import { DraftRequest } from '../draft_request/draft_request.entity'
import { messageSerializer } from '../message/message.serializer'
import { requestSerializer } from '../request/request.serializer'
import { RoomUser } from '../room_user/room_user.entity'
import { room_userSerializer } from '../room_user/room_user.serializer'
import { Room } from './room.entity'

export const roomSerializer = (
  room: Room,
  otherUser: RoomUser,
  currentUser: RoomUser,
  message: string | null,
  created_at: Date,
) => ({
  id: room.id,
  created_at: created_at,
  isClosed: room.isClosed,
  request: requestSerializer(room.request),
  otherUser: {
    ...room_userSerializer(otherUser),
  },
  currentUser: {
    ...room_userSerializer(currentUser),
  },
  message: message,
})

export const getByRoomIdSerializer = (
  room: Room,
  draftRequest: DraftRequest,
  currentUserId: number,
) => {
  const otherUser = room.room_users.find(
    (roomUser) => roomUser.user.id !== currentUserId,
  )!
  const currentUser = room.room_users.find(
    (roomUser) => roomUser.user.id === currentUserId,
  )!
  return {
    id: room.id,
    request: room.request,
    draftRequest: draftRequest,
    otherUser: room_userSerializer(otherUser),
    currentUser: room_userSerializer(currentUser),
    messages: room.messages.map((message) => messageSerializer(message)),
  }
}
