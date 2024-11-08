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
import { RequestService } from '../request/request.service'

@Controller()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()
  private requestService = new RequestService()

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
      rooms.push(room)
    }
    return res.json({
      rooms: rooms.map((room) => roomSerializer(room)),
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
    return res.json({ room: roomSerializer(room) })
  }

  @Authorized()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { requestId } = req.body
    const userId = req.currentUserId!
    const rooms = await this.roomService.getByRequestId({ requestId })
    if (typeof rooms !== undefined) {
      for (let i: number = 0; i < rooms!.length; i++) {
        const room = rooms![i]
        const roomId = room.id
        const room_user = await this.roomUserService.getByRoomUser({
          roomId,
          userId,
        })
        if (room_user !== null) {
          return res.json({ Room: room })
        }
      }
    }

    const id = requestId
    const request = await this.requestService.getById({ id })
    const requestUserId = request.user.id
    const createRoom = await this.roomService.create({ requestId })
    await this.roomUserService.create({
      requestUserId: requestUserId,
      currentUserId: req.currentUserId!,
      createRoomId: createRoom.id,
    })

    return res.json({
      Room: createRoom,
    })
  }
}
