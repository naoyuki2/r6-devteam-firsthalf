import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Get } from 'routing-controllers'
import { MessageService } from './message.service'
import {
  CreateEndpoint,
  CreateReq,
  CreateRes,
  GetByIdEndpoint,
  GetByIdParam,
  GetByIdRes,
} from './message.type'
import { messageSerializer } from './message.serializer'
import { Message } from './message.entity'

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
    return res.json({ message: messageSerializer(message) })
  }
  @Get(GetByIdEndpoint)
  async getById(
    @Req() req: Request<GetByIdParam, '', '', ''>,
    @Res() res: Response<GetByIdRes>,
  ) {
    const { id } = req.params
    const getMessages = await this.messageService.getById(id)
    return res.json({
      messages: getMessages.map((message: Message) =>
        messageSerializer(message),
      ),
    })
  }
}
