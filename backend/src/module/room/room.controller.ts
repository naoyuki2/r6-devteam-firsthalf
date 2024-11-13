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
  GetByUserIdEndpoint,
  GetByRoomIdEndpoint,
  GetByUserIdRes,
  GetByRoomIdParam,
  GetByRoomIdRes,
} from './room.type'
import { RoomUserService } from '../room_user/room_user.service'

@Controller()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()

  @Authorized()
  @Get(GetByUserIdEndpoint)
  async getByUserId(@Req() req: Request, @Res() res: Response<GetByUserIdRes>) {
    const userId = req.currentUserId!
    const rooms = []
    const roomUsers = await this.roomService.getByUserId({ userId })
    for (let i: number = 0; i < roomUsers.length; i++) {
      const room_user = roomUsers[i]
      const { id } = room_user.room
      const room = await this.roomService.getByRoomId({ id })
      const otherUser = room.room_users.find(
        (roomUser) => roomUser.user.id !== userId,
      )!.user
      rooms.push({ room, otherUser })
    }
    return res.json({
      rooms: rooms.map(({ room, otherUser }) =>
        roomSerializer(room, otherUser),
      ),
    })
  }

  @Authorized()
  @Get(GetByRoomIdEndpoint)
  async getByRoomId(
    @Req() req: Request<GetByRoomIdParam, '', '', ''>,
    @Res() res: Response<GetByRoomIdRes>,
  ) {
    const { id } = req.params
    const room = await this.roomService.getByRoomId({ id })
    const otherUser = room.room_users.find(
      (roomUser) => roomUser.user.id !== req.currentUserId,
    )!.user // エラー出たらここ怪しいかも
    return res.json({ room: roomSerializer(room, otherUser) })
  }

  @Authorized()
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
