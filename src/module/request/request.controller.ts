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
  async getAll(@Req() _req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const requests = await this.requestService.getAll()
      return res.json(requests)
    } catch (error) {
      next(error)
    }
  }

  @Get('/:id')
  async getOneById(
    @Param('id') id: number,
    @Req() _req: Request,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const request = await this.requestService.getOneById(id)
      return res.json(request)
    } catch (error) {
      next(error)
    }
  }
}
