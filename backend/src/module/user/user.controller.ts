import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Authorized,
} from 'routing-controllers'
import { UserService } from './user.service'
import { generateToken } from '../../utils/token'
import { userSerializer } from './user.serializer'
import { GetUser, SignUp } from './user.type'
import { setCurrentUser } from 'src/middleware/setCurrentUser'

@Controller()
export class UserController {
  private userService = new UserService()

  @Post(SignUp.endpoint)
  async signUp(
    @Req() req: Request<{}, {}, SignUp.req, {}>,
    @Res() res: Response<SignUp.res>,
  ) {
    const { name, email, password } = req.body
    const getUser = await this.userService.signUp({ name, email, password })
    const token = generateToken(getUser.id)
    return res.json({ user: userSerializer(getUser), token })
  }

  @Get(GetUser.endpoint)
  @Authorized()
  async getUser(
    @Req() req: Request<{}, {}, {}, {}>,
    @Res() res: Response<GetUser.res>,
  ) {
    const id = req.currentUserId!
    const user = await this.userService.getById({ id })
    return res.json({ user: userSerializer(user) })
  }
}
