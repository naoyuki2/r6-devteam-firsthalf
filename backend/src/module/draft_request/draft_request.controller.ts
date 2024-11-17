import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Req, Res, Post } from 'routing-controllers'
import {
  CreateByIdEndpoint,
  CreateByIdParam,
  CreateByIdRes,
  ProposeUpBody,
  ProposeUpEndpoint,
  ProposeUpParam,
  ProposeUpRes,
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

  @Post(ProposeUpEndpoint)
  async proposeUpdate(
    @Req() req: Request<ProposeUpParam, '', ProposeUpBody, ''>,
    @Res() res: Response<ProposeUpRes>,
  ) {
    const requestId = req.params.requestId
    const body = req.body
    const items = req.body.draft_items
    const updateRequest = await this.draft_requestService.proposeUpdate(
      requestId,
      body,
      items,
    )

    return res.json({
      draft_request: draft_requestSerializer(updateRequest),
    })
  }
}
