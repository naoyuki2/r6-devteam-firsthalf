import 'reflect-metadata'
import {
  Controller,
  Get,
  Post,
  Render,
  Body,
  Res,
  Req,
} from 'routing-controllers'
import {
  AppPages,
  HeaderFooterRenderData,
  HomeRenderData,
  RenderData,
  SignUpRenderData,
} from './page.type'
import { getAllRequest, GetByIdRequest } from '../request/request.client'
import { SignUp } from '../user/user.type'
import { postSignup } from '../user/user.client'
import { Response, Request } from 'express'
import { title } from 'process'

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
    }
  }
}
