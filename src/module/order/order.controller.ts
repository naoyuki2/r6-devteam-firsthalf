import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { Get, Param, Req, Res, Controller } from 'routing-controllers'
import { OrderService } from './order.service'

@Controller('/api/orders')
export class OrderController {
  private orderService: OrderService

  constructor() {
    this.orderService = new OrderService()
  }

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const orders = await this.orderService.getAll()
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
      const order = await this.orderService.getOneById(id)
      return res.json(order)
    } catch (error) {
      next(error)
    }
  }
}
