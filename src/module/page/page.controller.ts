import 'reflect-metadata'
import { Controller, Get, Render, Req, Res } from 'routing-controllers'
import {
  AppPages,
  DetailRenderData,
  HeaderFooterRenderData,
  RenderData,
} from './page.type'
import { getAllRequest, GetByIdRequest } from '../request/request.client'
import { GetById } from '../request/request.type'
import { Request, Response } from 'express'
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

  @Get('/detail/:id')
  @Render(AppPages.detail)
  async detail(
    @Req() req: Request<GetById.param, {}, {}, {}>,
    @Res() res: Response<GetById.res>,
  ): Promise<any> {
    const data = await GetByIdRequest(req.params.id)
    console.log(data)
    return {
      title: 'detail/:id',
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

  @Get('/signup')
  @Render(AppPages.signup)
  async(): RenderData {
    return {
      title: 'Signup',
    }
  }
}
