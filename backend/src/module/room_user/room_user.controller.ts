import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Authorized } from 'routing-controllers'
import {
  AgreedEndpoint,
  AgreedParam,
  AgreedRequestRes,
  AgreedUserRes,
} from './room_user.type'
import { RoomUserService } from './room_user.service'
import { RoomService } from '../room/room.service'
import { requestSerializer } from '../request/request.serializer'

@Controller()
export class RoomUserController {
  private roomUserService = new RoomUserService()
  private roomService = new RoomService()

  @Authorized()
  @Post(AgreedEndpoint)
  async agreed(
    @Req() req: Request<AgreedParam, '', '', ''>,
    @Res() res: Response<AgreedRequestRes | AgreedUserRes>,
  ) {
    const roomId = req.params.roomId
    const currentUserId = req.currentUserId!
    const room = await this.roomService.getByRoomId({ id: roomId })

    const otherRoomUser = room.room_users.find(
      (roomUser) => roomUser.user.id !== currentUserId,
    )!
    const currentRoomUser = room.room_users.find(
      (roomUser) => roomUser.user.id === currentUserId,
    )!

    const isAgreed = await this.roomUserService.checkAgreed({
      otherRoomUser,
      currentRoomUser,
    })

    if (isAgreed) {
      const updatedRequest = await this.roomUserService.conclusion({
        roomId,
      })
      return res.json({
        request: requestSerializer(updatedRequest),
      })
    } else {
      return res.json({
        isAgreed: false,
      })
    }
  }
}
