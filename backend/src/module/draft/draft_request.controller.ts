import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post } from 'routing-controllers'
import {
  CreateByIdEndpoint,
  CreateByIdParam,
  CreateByIdRes,
} from './draft_request.type'
import { DraftRequestService } from './draft_request.service'
import { draft_requestSerializer } from './draft_request.serializer'

@Controller()
export class RequestController {
  private draft_requestService = new DraftRequestService()

  @Post(CreateByIdEndpoint)
  async create(
    @Req() req: Request<CreateByIdParam, '', '', ''>,
    @Res() res: Response<CreateByIdRes>,
  ) {
    const { requestId } = req.params
    const request = await this.draft_requestService.create({ requestId })
    return res.json({
      draft_request: draft_requestSerializer(request),
    })
  }
}
