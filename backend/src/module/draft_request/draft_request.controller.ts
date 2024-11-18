import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post, Delete } from 'routing-controllers'
import {
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
    return res.json({
      success: await this.draft_requestService.reject(
        req.params.draftRequestId,
      ),
    })
  }
}
