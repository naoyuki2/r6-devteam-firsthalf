import { Room } from './room.entity'
import { RoomUser } from '../room_user/room_user.entity'
const root = '/room'

export namespace Create {
  export const endpoint = root

  export type req = {
    requestId: number
    userId: number
  }

  export type res = {
    createRoomId: String
    requestId: number
    createRoomUser: RoomUser[]
  }
}
