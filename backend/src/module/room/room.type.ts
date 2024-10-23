import { RoomUser } from '../room_user/room_user.entity'
import { Message } from '../message/message.entity'
import { Request } from '../request/request.entity'
const root = '/rooms'

export namespace GetById {
  export const endpoint = root

  export type req = {
    userId: number
  }

  export type res = {
    room: {
      id: string
      created_at: Date
      isClosed: boolean
      request: Request
      room_users: RoomUser[]
      messages: Message[]
    }
  }
}
