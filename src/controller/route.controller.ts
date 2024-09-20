import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, HomeRenderData, RenderData } from '../type/route'


@Controller()
export class RouteController {
  @Get('/')
  @Render(AppPages.landing)
  landing(): RenderData {
    return {
      title: 'アプリ名',
    }
  }
}
