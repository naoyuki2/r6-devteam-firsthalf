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
import { RequestService } from './request.service'
import { requestSerializer } from './request.serializer'
import {
  CreateEndpoint,
  CreateReq,
  CreateRes,
  GetByIdEndpoint,
  GetByIdParam,
  GetByIdRes,
  GetEndpoint,
  GetQuery,
  GetRes,
} from './request.type'
import { RoomService } from '../room/room.service'
import { DraftRequestService } from '../draft_request/draft_request.service'

@Controller()
export class RequestController {
  private requestService = new RequestService()
  private roomService = new RoomService()
  private draftRequestService = new DraftRequestService()

  @Get(GetEndpoint)
  async get(
    @Req() req: Request<'', '', '', GetQuery>,
    @Res() res: Response<GetRes>,
  ) {
    const { userId } = req.query
    const requests = await this.requestService.get({ userId })
    return res.json({
      requests: requests.map((request) => requestSerializer(request)),
    })
  }

  @Get(GetByIdEndpoint)
  async getById(
    @Req() req: Request<GetByIdParam, '', '', ''>,
    @Res() res: Response<GetByIdRes>,
  ) {
    const { id } = req.params
    const request = await this.requestService.getById({ id })
    return res.json({
      request: requestSerializer(request),
    })
  }

  @Authorized()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<'', '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const {
      title,
      location_prefecture,
      location_details,
      delivery_prefecture,
      delivery_details,
      description,
      status,
      items,
    } = req.body
    const userId = req.currentUserId!
    const getRequest = await this.requestService.create({
      title,
      location_prefecture,
      location_details,
      delivery_prefecture,
      delivery_details,
      description,
      status,
      userId,
      items,
    })
    return res.json({ request: requestSerializer(getRequest) })
  }
}
