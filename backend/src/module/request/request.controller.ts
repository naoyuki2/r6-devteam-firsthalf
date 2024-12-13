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
  AgreedEndpoint,
  AgreedParam,
  AgreedRes,
  CompletedEndpoint,
  CompletedParam,
  CompletedRes,
  ConcludedEndpoint,
  ConcludedParam,
  ConcludedRes,
  CreateEndpoint,
  CreateReq,
  CreateRes,
  GetByIdEndpoint,
  GetByIdParam,
  GetByIdRes,
  GetEndpoint,
  GetQuery,
  GetRes,
  ReceivedEndpoint,
  ReceivedParam,
  ReceivedRes,
  thumbnailUpdateEndpoint,
  ThumbnailUpdateParam,
  ThumbnailUpdateRes,
} from './request.type'
import { DraftRequestService } from '../draft_request/draft_request.service'
import { upload } from '../../lib/imageUpload'

@Controller()
export class RequestController {
  private requestService = new RequestService()
  private draftRequestService = new DraftRequestService()

  @Get(GetEndpoint)
  async get(
    @Req() req: Request<'', '', '', GetQuery>,
    @Res() res: Response<GetRes>,
  ) {
    const { userId, status, location_prefecture, delivery_prefecture } =
      req.query.filter
    const requests = await this.requestService.get({
      userId,
      status,
      location_prefecture,
      delivery_prefecture,
    })
    return res.json({
      requests: requests.map((request) => requestSerializer(request)),
    })
  }

  @Get(GetByIdEndpoint)
  async getRequestIdById(
    @Req() req: Request<GetByIdParam, '', '', ''>,
    @Res() res: Response<GetByIdRes>,
  ) {
    const { requestId } = req.params
    const request = await this.requestService.getByRequestId(requestId)
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
      color,
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
      color,
      userId,
      items,
    })
    return res.json({ request: requestSerializer(getRequest) })
  }

  // いらないかも
  @Authorized()
  @Patch(AgreedEndpoint)
  async agreed(
    @Req() req: Request<AgreedParam, '', '', ''>,
    @Res() res: Response<AgreedRes>,
  ) {
    const { requestId } = req.params
    const request = await this.requestService.agreed(requestId)
    return res.json({
      request: requestSerializer(request),
    })
  }

  @Authorized()
  @Patch(ConcludedEndpoint)
  async concluded(
    @Req() req: Request<ConcludedParam, '', '', ''>,
    @Res() res: Response<ConcludedRes>,
  ) {
    const { draftRequestId, requestId } = req.params

    const draftRequest =
      await this.draftRequestService.getByDraftRequestId(draftRequestId)
    const request = await this.requestService.getByRequestId(requestId)

    const concludedRequest = await this.requestService.concluded({
      draftRequest,
      request,
    })

    return res.json({
      request: requestSerializer(concludedRequest),
    })
  }

  @Patch(ReceivedEndpoint)
  async received(
    @Req() req: Request<ReceivedParam, '', '', ''>,
    @Res() res: Response<ReceivedRes>,
  ) {
    const { requestId } = req.params
    const request = await this.requestService.received(requestId)
    return res.json({
      request: requestSerializer(request),
    })
  }

  @Authorized()
  @Patch(CompletedEndpoint)
  async completed(
    @Req() req: Request<CompletedParam, '', '', ''>,
    @Res() res: Response<CompletedRes>,
  ) {
    const { requestId } = req.params
    const request = await this.requestService.completed(requestId)
    return res.json({
      request: requestSerializer(request),
    })
  }

  @Patch(thumbnailUpdateEndpoint)
  async thumbnailUpdate(
    @Req() req: Request<ThumbnailUpdateParam, '', '', ''>,
    @Res() res: Response<ThumbnailUpdateRes>,
  ) {
    const { requestId } = req.params
    const thumbnailImage = await upload(req, res, 'thumbnail')
    const thumbnail = await this.requestService.thumbnailUpdate({
      requestId,
      thumbnailUrl: thumbnailImage.url,
    })

    return res.json({
      thumbnailUrl: thumbnail,
    })
  }
}
