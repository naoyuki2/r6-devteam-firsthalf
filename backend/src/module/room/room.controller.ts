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
  private userService = new RoomService()

  @Get(GetById.endpoint)
  async getById(
    @Req() req: Request<GetById.req, {}, {}, {}>,
    @Res() res: Response<GetById.res>,
  ) {
    const { userId } = req.params
    const roomUser = await this.userService.getByRoomUser({ userId })
    const rooms = roomUser.room
    const id = rooms.id
    const room = await this.userService.getByRoom({ id })
    return res.json({
      room: roomSerializer(room),
    })
  }
}
