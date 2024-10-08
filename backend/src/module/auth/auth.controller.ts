import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Post, Req, Res } from 'routing-controllers'
import { generateToken } from '../../utils/token'
import { AuthService } from './auth.service'
import { userSerializer } from '../user/user.serializer'
import { SignIn } from './auth.type'

@Controller()
export class AuthController {
  private authService = new AuthService()

  @Post(SignIn.endpoint)
  async signIn(
    @Req() req: Request<{}, {}, SignIn.req, {}>,
    @Res() res: Response<SignIn.res>,
  ) {
    const { email, password } = req.body
    const authenticatedUser = await this.authService.signIn({
      email,
      password,
    })

    const token = generateToken(authenticatedUser.id)
    res.json({ user: userSerializer(authenticatedUser), token })
  }
}
