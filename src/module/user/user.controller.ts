import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { Controller, Post, Get, Put, Body, Req, Res } from 'routing-controllers'
import { UserService } from './user.service'
import { generateToken } from '../../utils/token'
import { SignUpParams, UserEndpoint } from './user.type'
import { userSerializer } from './user.serializer'

@Controller()
export class UserController {
  private userService = new UserService()

  @Post(UserEndpoint.signUp)
  async signUp(
    @Body() user: SignUpParams,
    @Req() _req: Request,
    @Res() res: Response,
    next: NextFunction,
  ) {
    const { name, email, password } = user
    try {
      const user = await this.userService.signUp({ name, email, password })
      const token = generateToken(user.id)
      res.json({ user: userSerializer(user), token })
    } catch (error) {
      console.error(error)
    }
  }
}
