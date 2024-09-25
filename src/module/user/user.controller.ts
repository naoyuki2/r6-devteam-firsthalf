import 'reflect-metadata'
import { NextFunction } from 'express'
import { Controller, Post, Get, Put, Body } from 'routing-controllers'
import { UserService } from './user.service'
import { Auth } from '../../utils/token'

@Controller('/api/user')
export class UserController {
  private userService = new UserService()
  private auth = new Auth()

  @Post('/signup')
  async register(
    @Body()
    body: {
      username: string
      email: string
      password: string
    },
    next: NextFunction,
  ) {
    const { username, email, password } = body

    try {
      const user = await this.userService.signup(username, email, password) //user情報登録メソッドの呼び出し

      const token = this.auth.generateToken(user.id) //token生成メソッドの呼び出し

      return { message: '登録が成功しました。', token }
    } catch (error) {
      next(error)
    }
  }
}
