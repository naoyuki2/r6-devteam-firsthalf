import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { Get, Param, Req, Res, Controller } from 'routing-controllers'
import { RequestService } from './request.service'

@Controller('/api/requests')
export class RequestController {
  private requestService: RequestService

  constructor() {
    this.requestService = new RequestService()
  }

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const orders = await this.requestService.getAll()
      return res.json(orders)
    } catch (error) {
      next(error)
    }
  }

  @Get('/:id')
  async getOneById(
    @Param('id') id: number,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const order = await this.requestService.getOneById(id)
      return res.json(order)
    } catch (error) {
      next(error)
    }
  }
}
