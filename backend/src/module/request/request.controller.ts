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
import { Create, GetAll, GetById } from './request.type'
import { RequestService } from './request.service'
import { requestSerializer } from './request.serializer'

@Controller()
export class RequestController {
  private requestService = new RequestService()

  @Get(GetAll.endpoint)
  async getAll(
    @Req() req: Request<{}, {}, {}, GetAll.param>,
    @Res() res: Response<GetAll.res>,
  ) {
    const { userId } = req.query
    const requests = await this.requestService.getAll({ userId })
    return res.json({
      requests: requests.map((request) => requestSerializer(request)),
    })
  }

  @Get(GetById.endpoint)
  async getById(
    @Req() req: Request<GetById.param, {}, {}, {}>,
    @Res() res: Response<GetById.res>,
  ) {
    const { id } = req.params
    const request = await this.requestService.getById({ id })
    return res.json({
      request: requestSerializer(request),
    })
  }

  @Authorized()
  @Post(Create.endpoint)
  async createRequest(
    @Req() req: Request<{}, {}, Create.req, {}>,
    @Res() res: Response<Create.res>,
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
