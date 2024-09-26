import 'reflect-metadata'
import { NextFunction } from 'express'
import { Controller, Post, Body } from 'routing-controllers'
import { generateToken } from '../../utils/token'
import { AuthService } from './auth.service'
import { signInParams } from './auth.type'

@Controller('/api/auth')
export class AuthController {
  private userService = new AuthService()

  @Post('/')
  async Signin(@Body() user: signInParams, next: NextFunction) {
    const { email, password } = user
    try {
      const authenticatedUser = await this.userService.signin({ email, password })
      
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

