import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Controller,
  Req,
  Res,
  Post,
  Get,
  Authorized,
} from 'routing-controllers'
import {
  CreateEndpoint,
  CreateParam,
  CreateReq,
  CreateRes,
  GetByIdEndpoint,
  GetByIdParam,
  GetByIdRes,
} from './review.type'
import { ReviewService } from './review.service'
import { reviewSerializer } from './review.serializer'

@Controller()
export class ReviewController {
  private reviewService = new ReviewService()
  @Authorized()
  @Post(CreateEndpoint)
  async create(
    @Req() req: Request<CreateParam, '', CreateReq, ''>,
    @Res() res: Response<CreateRes>,
  ) {
    const sendUserId = req.currentUserId!
    const receiveUserId = req.params.receiveUserId
    const { body, sendUserRole, isGood } = req.body

    await this.reviewService.create({
      sendUserId,
      receiveUserId,
      body,
      sendUserRole,
      isGood,
    })
    return res.json({ success: true })
  }

  @Get(GetByIdEndpoint)
  async getById(
    @Req() req: Request<GetByIdParam, '', '', ''>,
    @Res() res: Response<GetByIdRes>,
  ) {
    const receiveUserId = req.params.userId
    const reviews = await this.reviewService.getById(receiveUserId)

    return res.json({
      reviews: reviews.map((review) => reviewSerializer(review)),
    })
  }
}
