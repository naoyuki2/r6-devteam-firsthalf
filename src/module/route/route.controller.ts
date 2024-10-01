import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, RenderData, requestRenderData } from '../../type/route'

@Controller()
export class RouteController {
  @Get('/')
  @Render(AppPages.landing)
  landing(): RenderData {
    return {
      title: 'Landing',
    }
  }

  @Get('/request')
  @Render(AppPages.request)
  requestForm(): requestRenderData {
    return {
      title: '依頼を作成',
      body: '',
    }
  }
}
