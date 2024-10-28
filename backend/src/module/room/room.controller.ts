import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Get,
  Controller,
  Req,
  Res,
  Post,
  Authorized,
} from 'routing-controllers'
import { RoomService } from './room.service'
import { GetById } from '../room/room.type'
import { roomSerializer } from './room.serializer'

@Controller()
export class RoomController {
  private roomService = new RoomService()

  @Authorized()
  @Get(GetById.endpoint)
  async getById(@Req() req: Request, @Res() res: Response<GetById.res>) {
    const userId = req.currentUserId!
    const rooms = []
    const roomUsers = await this.roomService.getByRoomUser({ userId })
    for (let i: number = 0; i < roomUsers.length; i++) {
      const room_user = roomUsers[i]
      const { id } = room_user.room
      const room = await this.roomService.getByRoom({ id })
      rooms.push(room)
    }
    return res.json({
      rooms: rooms.map((room) => roomSerializer(room)),
    })
  }
}
