import 'reflect-metadata'
import { Controller, Get, Post, Render, Body, Res } from 'routing-controllers'
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
import { Response } from 'express'
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
  async postSignup(@Body() body: SignUp.req, @Res() res: Response) {
    try {
      await postSignup(body)
      return res.render(AppPages.success)
    } catch (err: any) {
      const errorData = {
        error: err,
      }
      res.render(AppPages.signup, {
        title: 'Signup',
        errorData,
      })

      return errorData
    }
  }
}
