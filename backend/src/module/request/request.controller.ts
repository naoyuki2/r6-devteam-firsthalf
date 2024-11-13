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
  UpdateReq,
  UpdateRequestParamEndpoint,
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

  @Patch(UpdateRequestParamEndpoint)
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
    const userId = req.currentUserId!
    if (request.user.id !== userId) {
      throw new CustomError('Please verify the ID and try again.', 401)
    }
    if (inputTitle !== undefined) {
      request.title = inputTitle
    }

    if (inputLocation_prefecture !== undefined) {
      request.location_prefecture = inputLocation_prefecture
    }

    if (inputLocation_details !== undefined) {
      request.location_details = inputLocation_details
    }

    if (inputDelivery_prefecture !== undefined) {
      request.delivery_prefecture = inputDelivery_prefecture
    }

    if (inputDelivery_details !== undefined) {
      request.delivery_details = inputDelivery_details
    }

    if (inputDescription !== undefined) {
      request.description = inputDescription
    }

    if (inputStatus !== undefined) {
      request.status = inputStatus
    }
    const updateRequest = await this.requestService.update({
      request,
    })
    return res.json({ request: requestSerializer(updateRequest) })
  }
}
