import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Controller,
  Req,
  Res,
  Post,
  Authorized,
  Patch,
} from 'routing-controllers'
import {
  AgreedEndpoint,
  AgreedParam,
  AgreedUserRes,
  FeedbackEndpoint,
  FeedbackParam,
  FeedbackRes,
  ReceivedEndpoint,
  ReceivedParam,
  ReceivedRes,
} from './room_user.type'
import { RoomUserService } from './room_user.service'
import { RoomService } from '../room/room.service'

@Controller()
export class RoomUserController {
  private roomUserService = new RoomUserService()
  private roomService = new RoomService()

  @Authorized()
  @Post(AgreedEndpoint)
  async agreed(
    @Req() req: Request<AgreedParam, '', '', ''>,
    @Res() res: Response<AgreedUserRes>,
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

    if (!isAgreed) return res.json({ isAgreed: false })
    await this.roomUserService.conclusion({ roomId })
    return res.json({ isAgreed: true })
  }

  @Authorized()
  @Post(ReceivedEndpoint)
  async received(
    @Req() req: Request<ReceivedParam, '', '', ''>,
    @Res() res: Response<ReceivedRes>,
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

    const isReceived = await this.roomUserService.checkReceived({
      otherRoomUser,
      currentRoomUser,
    })

    if (!isReceived) return res.json({ isReceived: false })
    return res.json({ isReceived: true })
  }

  @Authorized()
  @Patch(FeedbackEndpoint)
  async feedback(
    @Req() req: Request<FeedbackParam, '', '', ''>,
    @Res() res: Response<FeedbackRes>,
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
    const isFeedback = await this.roomUserService.checkFeedback({
      currentRoomUser,
      otherRoomUser,
    })

    if (!isFeedback) return res.json({ success: false })
    return res.json({ success: true })
  }
}
