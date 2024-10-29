import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Post, Req, Res } from 'routing-controllers'
import { generateToken } from '../../utils/token'
import { AuthService } from './auth.service'
import { userSerializer } from '../user/user.serializer'
import { SignInEndpoint, SignInReq, SignInRes } from './auth.type'

@Controller()
export class AuthController {
  private authService = new AuthService()

  @Post(SignInEndpoint)
  async signIn(
    @Req() req: Request<'', '', SignInReq, ''>,
    @Res() res: Response<SignInRes>,
  ) {
    const { email, password } = req.body
    const authenticatedUser = await this.authService.signIn({
      email,
      password,
    })

    const token = generateToken(authenticatedUser.id)
    return res.json({ user: userSerializer(authenticatedUser), token })
  }
}
