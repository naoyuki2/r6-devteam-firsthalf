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
  CreateRequestEndpoint,
  CreateRequestReq,
  CreateRequestRes,
  GetAllRequestsEndpoint,
  GetAllRequestsParam,
  GetAllRequestsRes,
  GetRequestByIdEndpoint,
  GetRequestByIdParam,
  GetRequestByIdRes,
} from './request.type'

@Controller()
export class RequestController {
  private requestService = new RequestService()

  @Get(GetAllRequestsEndpoint)
  async getAll(
    @Req() req: Request<'', '', '', GetAllRequestsParam>,
    @Res() res: Response<GetAllRequestsRes>,
  ) {
    const { userId } = req.query
    const requests = await this.requestService.getAll({ userId })
    return res.json({
      requests: requests.map((request) => requestSerializer(request)),
    })
  }

  @Get(GetRequestByIdEndpoint)
  async getById(
    @Req() req: Request<GetRequestByIdParam, '', '', ''>,
    @Res() res: Response<GetRequestByIdRes>,
  ) {
    const { id } = req.params
    const request = await this.requestService.getById({ id })
    return res.json({
      request: requestSerializer(request),
    })
  }

  @Authorized()
  @Post(CreateRequestEndpoint)
  async createRequest(
    @Req() req: Request<'', '', CreateRequestReq, ''>,
    @Res() res: Response<CreateRequestRes>,
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
    const item = await this.requestService.createItem({ items })
    const getRequest = await this.requestService.createRequest({
      title,
      location_prefecture,
      location_details,
      delivery_prefecture,
      delivery_details,
      description,
      status,
      userId,
      item,
    })
    return res.json({ request: requestSerializer(getRequest) })
  }
}
