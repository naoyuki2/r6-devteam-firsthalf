import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Get,
  Controller,
  Req,
  Res,
  Post,
  Authorized,
  Patch,
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
  UpdateEndpoint,
  UpdateReq,
  UpdateRes,
} from './request.type'
import { CustomError } from '../../error/CustomError'

@Controller()
export class RequestController {
  private requestService = new RequestService()

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

  @Patch(UpdateEndpoint)
  @Authorized()
  async update(
    @Req() req: Request<'', '', UpdateReq, ''>,
    @Res() res: Response<UpdateRes>,
  ) {
    const {
      requestId,
      inputTitle,
      inputLocation_prefecture,
      inputLocation_details,
      inputDelivery_prefecture,
      inputDelivery_details,
      inputDescription,
      inputStatus,
    } = req.body
    const request = await this.requestService.getById({ id: requestId })
    console.log('requestUserId', request.user.id)
    console.log('currentUserId', req.currentUserId)
    if (request.user.id !== req.currentUserId!)
      throw new CustomError('Please verify the ID and try again.', 401)

    Object.assign(request, {
      ...(inputTitle !== undefined && { title: inputTitle }),
      ...(inputLocation_prefecture !== undefined && {
        location_prefecture: inputLocation_prefecture,
      }),
      ...(inputLocation_details !== undefined && {
        location_details: inputLocation_details,
      }),
      ...(inputDelivery_prefecture !== undefined && {
        delivery_prefecture: inputDelivery_prefecture,
      }),
      ...(inputDelivery_details !== undefined && {
        delivery_details: inputDelivery_details,
      }),
      ...(inputDescription !== undefined && { description: inputDescription }),
      ...(inputStatus !== undefined && { status: inputStatus }),
    })

    const updateRequest = await this.requestService.update({
      request,
    })

    return res.json({ request: requestSerializer(updateRequest) })
  }
}
