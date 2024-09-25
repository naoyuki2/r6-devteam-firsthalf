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
  async register(@Body() user: any, next: NextFunction) {
    console.error(user)
    const { name, email, password } = user
    console.error(name, email, password)
    try {
      const user = await this.userService.signup({ name, email, password }) //user情報登録メソッドの呼び出し
      console.log('ユーザー情報登録通ったよ')
      const token = this.auth.generateToken(user.id) //token生成メソッドの呼び出し
      console.log('トークン生成できたよ')
      return { message: '登録が成功しました。', token }
    } catch (error) {
      console.error(error)
    }
  }
}
