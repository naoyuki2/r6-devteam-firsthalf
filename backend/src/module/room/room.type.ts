import { Room } from './room.entity'
import { RoomUser } from '../room_user/room_user.entity'
const root = '/rooms'

export namespace Create {
  export const endpoint = root

  export type req = {
    requestId: number
    requestUserId: number
  }

  export type res = {
    createRoomId: String
    requestId: number
    createRoomUser: RoomUser[]
  }
}
