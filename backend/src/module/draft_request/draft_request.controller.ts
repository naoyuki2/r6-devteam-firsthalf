import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Controller,
  Req,
  Res,
  Post,
  Delete,
  Get,
  Authorized,
} from 'routing-controllers'
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
  ProposeUpBody,
  ProposeUpEndpoint,
  ProposeUpParam,
  ProposeUpRes,
  GetByIdEndpoint,
  GetByIdParam,
  GetByIdRes,
  DeleteEndpoint,
  DeleteParam,
  DeleteRes,
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
    const room = await this.roomService.getByRoomId(roomId)
    const draft_request = await this.draft_requestService.create(room)

    return res.json({
      draft_request: draft_requestSerializer(draft_request),
    })
  }

  @Get(GetByIdEndpoint)
  async get(
    @Req() req: Request<GetByIdParam, '', '', ''>,
    @Res() res: Response<GetByIdRes>,
  ) {
    const roomId = req.params.roomId
    const draftRequest = await this.draft_requestService.getByRoomId(roomId)

    if (draftRequest == undefined || null) return

    return res.json({
      draft_request: draft_requestSerializer(draftRequest),
    })
  }

  @Authorized()
  @Post(ProposeUpEndpoint)
  async proposeUpdate(
    @Req() req: Request<ProposeUpParam, '', ProposeUpBody, ''>,
    @Res() res: Response<ProposeUpRes>,
  ) {
    const draftRequestId = req.params.draftRequestId
    const body = req.body
    const updateRequest = await this.draft_requestService.proposeUpdate({
      draftRequestId,
      body,
    })

    return res.json({
      draft_request: draft_requestSerializer(updateRequest),
    })
  }

  @Delete(RejectEndpoint)
  async reject(
    @Req() req: Request<RejectParam, '', '', ''>,
    @Res() res: Response<RejectRes>,
  ) {
    const draftRequestId = req.params.draftRequestId
    const rejectFlag = await this.draft_requestService.reject(draftRequestId)

    return res.json({
      success: rejectFlag,
    })
  }

  @Delete(ApproveEndpoint)
  async approve(
    @Req() req: Request<ApproveParam, '', '', ''>,
    @Res() res: Response<ApproveRes>,
  ) {
    const draftRequestId = req.params.roomId
    const draftRequest = await this.draft_requestService.approve(draftRequestId)

    return res.json({
      draft_request: draft_requestSerializer(draftRequest),
    })
  }

  @Delete(DeleteEndpoint)
  async delete(
    @Req() req: Request<DeleteParam, '', '', ''>,
    @Res() res: Response<DeleteRes>,
  ) {
    const { roomId } = req.params
    const success = await this.draft_requestService.delete(roomId)

    return res.json({ success })
  }
}
