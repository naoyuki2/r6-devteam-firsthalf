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
import { roomSerializer } from './room.serializer'
import {
  CreateEndpoint,
  CreateReq,
  CreateRes,
  GetByIdEndpoint,
  GetByIdRes,
} from './room.type'
import { RoomUserService } from '../room_user/room_user.service'

@Controller()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()

  @Authorized()
  @Get(GetByIdEndpoint)
  async getById(@Req() req: Request, @Res() res: Response<GetByIdRes>) {
    const userId = req.currentUserId!
    const rooms = []
    const roomUsers = await this.roomUserService.getByRoomUser({ userId })
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

  @Authorized()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { requestId, requestUserId } = req.body
    const createRoom = await this.roomService.create({ requestId })
    const createRoomUser = await this.roomUserService.create({
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
