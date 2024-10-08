import 'reflect-metadata'
import { Request, Response } from 'express'
import { Get, Controller, Req, Res, Post } from 'routing-controllers'
import { Create, GetAll, GetById } from './request.type'
import { RequestService } from './request.service'
import { requestSerializer } from './request.serializer'

@Controller()
export class RequestController {
  private requestService = new RequestService()

  @Get(GetAll.endpoint)
  async getAll(@Req() _req: Request, @Res() res: Response<GetAll.res>) {
    const requests = await this.requestService.getAll()
    return res.json({
      requests: requests.map((request) => requestSerializer(request)),
    })
  }

  @Get(GetById.endpoint())
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
      userId,
      items,
    } = req.body
    const item = await this.requestService.createItem({ items })
    const getRequest = await this.requestService.createRequest({
      title,
      location_prefecture,
      location_details,
      delivery_prefecture,
      delivery_details,
      description,
      userId,
      item,
    })
    return res.json({ request: requestSerializer(getRequest) })
  }
}
