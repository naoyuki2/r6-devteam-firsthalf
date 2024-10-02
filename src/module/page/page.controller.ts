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

  @Get('/home')
  @Render(AppPages.home)
  async home() {
    const data = await getAllRequest()
    return {
      title: 'Home',
      data: data,
    }
  }

  @Get('/detail')
  @Render(AppPages.detail)
  detail(): RenderData {
    return {
      title: 'detail',
    }
  }

  @Get('/login')
  @Render(AppPages.login)
  login(): RenderData {
    return {
      title: 'Login',
    }
  }

  @Get('/signup')
  @Render(AppPages.signup)
  async(): RenderData {
    return {
      title: 'Signup',
    }
  }
}
