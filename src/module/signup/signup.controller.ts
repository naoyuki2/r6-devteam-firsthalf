import 'reflect-metadata'
import { NextFunction} from 'express';
import { Controller, Post, Body, BadRequestError } from 'routing-controllers'
import { SignupService } from './signup.service'
import { AuthService } from './auth.service'

@Controller()
export class UserController {
  private signupService = new SignupService()
  private authService = new AuthService()

  @Post('/register')
  async register(
    @Body() body: { username: string, email: string, password: string ,icon_image_url:string},
    next:NextFunction
  ) {
    const { username, email, password ,icon_image_url} = body

    try {
      const user = await this.signupService.registerUser(username, email, password,icon_image_url)//user情報登録メソッドの呼び出し

      const token = this.authService.generateToken(user.id)//token生成メソッドの呼び出し

      return { message: '登録が成功しました。', token }
    } catch (error) {
      next(error)
    }
  }
}
