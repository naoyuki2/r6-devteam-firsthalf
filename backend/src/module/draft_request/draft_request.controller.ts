import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Delete } from 'routing-controllers'
import {
  ApproveEndpoint,
  ApproveParam,
  ApproveRes,
  CreateByIdEndpoint,
  CreateByIdParam,
  CreateByIdRes,
  RejectEndpoint,
  RejectParam,
  RejectRes,
} from './draft_request.type'
import { DraftRequestService } from './draft_request.service'
import { draft_requestSerializer } from './draft_request.serializer'
import { RoomService } from '../room/room.service'

@Controller()
export class DraftRequestController {
  private draft_requestService = new DraftRequestService()
  private roomService = new RoomService()

  @Post(CreateByIdEndpoint)
  async create(
    @Req() req: Request<CreateByIdParam, '', '', ''>,
    @Res() res: Response<CreateByIdRes>,
  ) {
    const roomId = req.params.roomId
    const room = await this.roomService.getByRoomId({ id: roomId })
    const draft_request = await this.draft_requestService.create(room)

    return res.json({
      draft_request: draft_requestSerializer(draft_request),
    })
  }

  @Delete(RejectEndpoint)
  async reject(
    @Req() req: Request<RejectParam, '', '', ''>,
    @Res() res: Response<RejectRes>,
  ) {
    const draftRequestId = req.params.requestId
    const rejectFlag = await this.draft_requestService.reject(draftRequestId)

    return res.json({
      success: rejectFlag,
    })
  }

  @Delete(ApproveEndpoint)
  async delete(
    @Req() req: Request<ApproveParam, '', '', ''>,
    @Res() res: Response<ApproveRes>,
  ) {
    const draftRequestId = req.params.roomId
    const draftRequest = await this.draft_requestService.approve(draftRequestId)

    return res.json({
      draft_request: draft_requestSerializer(draftRequest),
    })
  }
}