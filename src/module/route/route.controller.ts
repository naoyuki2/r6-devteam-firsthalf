import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, RenderData } from '../../type/route'

@Controller()
export class RouteController {
  @Get('/')
  @Render(AppPages.landing)
  landing(): RenderData {
    return {
      title: 'Landing',
    }
  }

  @Get('/card')
  @Render(AppPages.card)
  card(): RenderData {
    return {
      title: 'Card',
    }
  }
  @Get('/login')
  @Render(AppPages.login)
  login(): RenderData {
    return {
      title: 'Login',
    }
  }
}
