import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, HomeRenderData } from '../type/route'

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
}
