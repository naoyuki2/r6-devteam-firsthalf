import 'reflect-metadata'
import { Request, Response ,NextFunction} from 'express';
import { Get, Param, Req, Res,Controller } from 'routing-controllers';
import { TravelService } from '../service/travel.controller';

@Controller('/api/travel')
export class TravelController {
  private travelService: TravelService;

  constructor() {
    this.travelService = new TravelService();
  }

  @Get('/')
  async getAll(
    @Req() req: Request,
    @Res() res: Response,
    next:NextFunction,
  ) {
    try {
      const travel = await this.travelService.getAllOrders();
      return res.json(travel); 
    } catch (error) {
        next(error);
    }
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: number,
    @Res() res: Response,
    next:NextFunction,
  ) {
    try {
      const traveler = await this.travelService.getOrderById(id);
      if (!traveler) {
        return res.status(404).json({ message: `Order with id ${id} not found` });
      }
      return res.json(traveler);
    } catch (error) {
        next(error);
    }
  }
}
