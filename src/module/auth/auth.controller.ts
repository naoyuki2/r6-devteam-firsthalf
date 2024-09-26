import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { Controller, Post, Body, Req, Res } from 'routing-controllers'
import { generateToken } from '../../utils/token'
import { AuthService } from './auth.service'
import { signInParams } from './auth.type'

@Controller('/api/auth')
export class AuthController {
  private userService = new AuthService()

  @Post('/')
  async signIn(
    @Body() user: signInParams,
    @Req() _req: Request,
    @Res() res: Response,
    next: NextFunction,
  ) {
    const { email, password } = user
    try {
      const authenticatedUser = await this.userService.signIn({
        email,
        password,
      })

      if (!authenticatedUser) {
        return { message: 'Invalid email or password' }
      }

      const token = generateToken(authenticatedUser.id)
      return { user: authenticatedUser, token }
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
