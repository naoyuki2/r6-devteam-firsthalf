import 'reflect-metadata'
import { NextFunction } from 'express'
import { Controller, Post, Get, Put, Body, Req } from 'routing-controllers'
import { UserService } from './user.service'
import { generateToken } from '../../utils/token'
import { signUpParams } from './user.type'

@Controller('/api/user')
export class UserController {
  private userService = new UserService()

  @Post('/')
  async register(@Body() user: signUpParams, next: NextFunction) {
    const { name, email, password } = user
    try {
      const user = await this.userService.signup({ name, email, password })
      const token = generateToken(user.id)
      // TODO : シリアライザーを作成してuser情報を整形する
      return { user, token }
    } catch (error) {
      console.error(error)
    }
  }
}
