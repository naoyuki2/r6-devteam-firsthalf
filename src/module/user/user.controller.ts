import 'reflect-metadata'
import { Request, Response } from 'express'
import { Controller, Post, Get, Req, Res } from 'routing-controllers'
import { UserService } from './user.service'
import { generateToken } from '../../utils/token'
import { userSerializer } from './user.serializer'
import { GetById, SignUp } from './user.type'

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
    //return res.json({ user: userSerializer(getUser), token })
    return res.redirect('/home')
  }

  @Get(GetById.endpoint)
  async getById(
    @Req() req: Request<GetById.param, {}, {}, {}>,
    @Res() res: Response<GetById.res>,
  ) {
    const { id } = req.params
    const user = await this.userService.getById({ id })
    return res.json({ user: userSerializer(user) })
  }
}
