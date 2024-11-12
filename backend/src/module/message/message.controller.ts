import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post } from 'routing-controllers'
import { MessageService } from './message.service'
import { CreateEndpoint, CreateReq, CreateRes } from './message.type'
import { createMessageSerializer } from './message.serializer'

@Controller()
export class MessageController {
  private messageService = new MessageService()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const { body, roomId, userId } = req.body
    const message = await this.messageService.create({
      body,
      roomId,
      userId,
    })
    return res.json({ message: createMessageSerializer(message) })
  }
}
