import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Authorized } from 'routing-controllers'
import { RoomService } from './room.service'
import { RoomUserService } from '../room_user/room_user.service'
import { CreateEndpoint, CreateReq, CreateRes } from './room.type'

@Controller()
@Authorized()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()

  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { requestId, requestUserId } = req.body
    const createRoom = await this.roomService.create({ requestId })
    await this.roomUserService.create({
      requestUserId: requestUserId,
      currentUserId: req.currentUserId!,
      createRoomId: createRoom.id,
    })

    return res.json({
      createRoomId: createRoom.id,
    })
  }
}
