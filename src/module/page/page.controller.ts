import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, HeaderFooterRenderData, RenderData } from './page.type'
import { getAllRequest, GetByIdRequest } from '../request/request.client'
@Controller()
export class PageController {
  @Get('/')
  @Render(AppPages.landing)
  landing(): RenderData {
    return {
      title: 'Landing',
    }
  }

  @Get('/card')
  @Render(AppPages.card)
  async card() {
    const data = await getAllRequest()
    return {
      title: 'Card',
      data: data,
    }
  }
  @Get('/login')
  @Render(AppPages.login)
  login(): RenderData {
    return {
      title: 'Login',
    }
  }
  @Get('/header-footer')
  @Render(AppPages.headerFooter)
  headerFooter(): HeaderFooterRenderData {
    return {
      title: '',
      body: '',
    }
  }
}
