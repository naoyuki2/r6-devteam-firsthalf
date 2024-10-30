import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Authorized } from 'routing-controllers'
import { MessageService } from './message.service'
import { SendEndpoint, CreateReq, CreateRes } from './message.type'
import { messageSerializer } from './message.serializer'

@Controller()
export class MessageController {
  private messageService = new MessageService()
  @Authorized()
  @Post(SendEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { body, roomId } = req.body
    const userId = req.currentUserId!
    const message = await this.messageService.create({
      body,
      roomId,
      userId,
    })

    return res.json({ message: messageSerializer(message) })
  }
}
