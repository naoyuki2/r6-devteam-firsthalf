import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, HomeRenderData, RenderData } from '../type/route'

@Controller()
export class RouteController {
  @Get('/')
  @Render(AppPages.home)
  home(): HomeRenderData {
    return {
      title: 'Home',
      body: 'Welcome to the home page',
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
