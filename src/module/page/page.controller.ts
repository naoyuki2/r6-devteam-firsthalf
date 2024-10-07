import 'reflect-metadata'
import { Controller, Get, Post, Render, Res, Req } from 'routing-controllers'
import {
  AppPages,
  HomeRenderData,
  RenderData,
  SignUpRenderData,
} from './page.type'
import { getAllRequest, GetByIdRequest } from '../request/request.client'
import { SignUp } from '../user/user.type'
import { postSignup } from '../user/user.client'
import { Response, Request } from 'express'
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
  async home(): Promise<HomeRenderData> {
    const data = await getAllRequest()
    return {
      title: 'Home',
      data: data,
    }
  }

  @Get('/home/:id')
  @Render(AppPages.detail)
  async detail(
    @Req() req: Request<GetById.param, {}, {}, {}>,
    @Res() res: Response<GetById.res>,
  ): Promise<any> {
    const data = await GetByIdRequest(req.params.id)
    return {
      title: 'detail',
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

  @Post('/signup')
  async postSignup(
    @Req() req: Request<{}, {}, SignUp.req, {}>,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await postSignup(req.body)
      return res.render(AppPages.success, {
        title: 'Success',
        user: user,
      })
    } catch (err: any) {
      const errorData: SignUpRenderData = {
        title: 'SignUp',
        data: null,
        error: err,
      }
      return res.render(AppPages.signup, {
        title: errorData.title,
        errorData,
      })
      
  @Get('/request')
  @Render(AppPages.request)
  request() {
    return {
      title: '',
      body: '',

    }
  }
}
