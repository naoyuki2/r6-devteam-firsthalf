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
import { Create } from './room.type'
import { RoomUserService } from '../room_user/room_user.service'

@Controller()
@Authorized()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()

  @Post(Create.endpoint)
  async create(
    @Req() req: Request<{}, {}, Create.req, {}>,
    @Res() res: Response<Create.res>,
  ) {
    const { requestId, requestUserId } = req.body
    const createRoom = await this.roomService.createRoom({ requestId })

    const createRoomUser = await this.roomUserService.createRoomUser({
      requestUserId: requestUserId,
      currentUserId: req.currentUserId!,
      createRoomId: createRoom.id,
    })

    return res.json({
      createRoomId: createRoom.id,
      requestId: createRoom.request.id,
      createRoomUser: createRoomUser,
    })
  }
}
