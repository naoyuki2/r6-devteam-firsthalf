import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Authorized } from 'routing-controllers'
import { RoomService } from './room.service'
import { RoomUserService } from '../room_user/room_user.service'
import { CreateRoomEndpoint, CreateRoomReq, CreateRoomRes } from './room.type'

@Controller()
@Authorized()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()

  @Post(CreateRoomEndpoint)
  async create(
    @Req() req: Request<'', '', CreateRoomReq, ''>,
    @Res() res: Response<CreateRoomRes>,
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
