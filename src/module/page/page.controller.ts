import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, HeaderFooterRenderData, RenderData } from './page.type'

@Controller()
export class PageController {
  @Get('/')
  @Render(AppPages.home)
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
  @Get('/header-footer')
  @Render(AppPages.headerFooter)
  headerFooter(): HeaderFooterRenderData {
    return {
      title: '',
      body: '',
    }
  }
  @Get('/detail')
  @Render(AppPages.detail)
  detail(): RenderData {
    return {
      title: 'detail',
    }
  }
}
