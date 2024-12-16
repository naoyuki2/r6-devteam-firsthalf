import {
  Authorized,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
} from 'routing-controllers'
import {
  CreateEndpoint,
  CreateReq,
  CreateRes,
  GetByRoomIdParam,
  GetEndpoint,
  GetRes,
  ViewEndpoint,
  ViewRes,
} from './notification.type'
import { Request, Response } from 'express'
import { NotificationService } from './notification.service'
import { notificationSerializer } from './notification.serializer'
import { CustomError } from '../../error/CustomError'

@Controller()
export class NotificationController {
  private notificationService = new NotificationService()

  @Authorized()
  @Get(GetEndpoint)
  async get(@Req() req: Request<''>, @Res() res: Response<GetRes>) {
    const userId = req.currentUserId!
    const notifications = await this.notificationService.get({ userId })
    if (notifications == undefined)
      throw new CustomError(
        'The requested notification could not be found.',
        404,
      )
    return res.json({
      notifications: notifications.map((notification) =>
        notificationSerializer(notification),
      ),
    })
  }

  @Authorized()
  @Patch(ViewEndpoint)
  async view(@Req() req: Request<''>, @Res() res: Response<ViewRes>) {
    const userId = req.currentUserId!
    const notifications = await this.notificationService.view({ userId })
    return res.json({
      notifications: notifications.map((notification) =>
        notificationSerializer(notification),
      ),
    })
  }

  @Authorized()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<GetByRoomIdParam, '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { roomId } = req.params
    const { body, type } = req.body
    const userId = req.currentUserId!

    const getNotification = await this.notificationService.create({
      userId,
      roomId,
      body,
      type,
    })
    return res.json({ notification: notificationSerializer(getNotification) })
  }
}
