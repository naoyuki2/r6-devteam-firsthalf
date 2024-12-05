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
import { getByRoomIdSerializer, roomSerializer } from './room.serializer'
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
import { CustomError } from '../../error/CustomError'
import { DraftRequestService } from '../draft_request/draft_request.service'
import { MessageService } from '../message/message.service'

@Controller()
export class RoomController {
  private roomService = new RoomService()
  private roomUserService = new RoomUserService()
  private requestService = new RequestService()
  private draftRequestService = new DraftRequestService()
  private messageService = new MessageService()

  @Authorized()
  @Get(GetByUserIdEndpoint)
  async getByUserId(
    @Req() req: Request<''>,
    @Res() res: Response<GetByUserIdRes>,
  ) {
    const userId = req.currentUserId!
    const rooms = []
    const roomUsers = await this.roomService.getByUserId(userId)
    for (let i = 0; i < roomUsers.length; i++) {
      const room_user = roomUsers[i]
      const { id } = room_user.room

      const room = await this.roomService.getByRoomId(id)
      const otherUser = room.room_users.find(
        (roomUser) => roomUser.user.id !== userId,
      )!
      const currentUser = room.room_users.find(
        (roomUser) => roomUser.user.id === userId,
      )!
      const latestMessage = await this.messageService.getByRoomId(room.id)
      console.log(latestMessage)
      if (latestMessage !== null) {
        const message = latestMessage.body
        const created_at = latestMessage.created_at
        rooms.push({ room, otherUser, currentUser, message, created_at })
      } else {
        const message = null
        const created_at = room.created_at
        rooms.push({ room, otherUser, currentUser, message, created_at })
      }
    }
    return res.json({
      rooms: rooms.map(
        ({ room, otherUser, currentUser, message, created_at }) =>
          roomSerializer(room, otherUser, currentUser, message, created_at),
      ),
    })
  }

  @Authorized()
  @Get(GetByRoomIdEndpoint)
  async getByRoomId(
    @Req() req: Request<GetByRoomIdParam, '', '', ''>,
    @Res() res: Response<GetByRoomIdRes>,
  ) {
    const { roomId } = req.params
    const room = await this.roomService.getByRoomId(roomId)
    const draftRequest = await this.draftRequestService.getByRoomId(roomId)

    if (draftRequest == undefined) {
      const request = await this.requestService.getByRequestId(room.request.id)
      return res.json({
        room: getByRoomIdSerializer(room, request, req.currentUserId!),
      })
    }

    return res.json({
      room: getByRoomIdSerializer(room, draftRequest, req.currentUserId!),
    })
  }

  @Authorized()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { requestId } = req.body
    const currentUserId = req.currentUserId!
    const request = await this.requestService.getByRequestId(requestId)

    if (request.user.id === currentUserId)
      throw new CustomError(
        'Please use a different userId to create a new room.',
        400,
      )
    const rooms = await this.roomService.getByRequestId({ requestId })
    if (rooms && rooms.length > 0) {
      for (let i = 0; i < rooms!.length; i++) {
        const room = rooms[i]
        const roomId = room.id
        const room_user = await this.roomUserService.getByRoomUser({
          roomId,
          userId: currentUserId,
        })
        if (room_user !== null) {
          return res.json({ room })
        }
      }
    }
    const newRoom = await this.roomService.create({ requestId })
    await this.roomUserService.create({
      requestUserId: request.user.id,
      currentUserId: req.currentUserId!,
      createRoomId: newRoom.id,
    })
    return res.json({
      room: newRoom,
    })
  }
}
