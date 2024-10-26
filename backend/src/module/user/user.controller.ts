import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Authorized,
  Patch,
} from 'routing-controllers'
import { UserService } from './user.service'
import { generateToken } from '../../utils/token'
import { userSerializer } from './user.serializer'
import {
  GetUserEndpoint,
  GetUserRes,
  SignUpEndpoint,
  SignUpReq,
  SignUpRes,
  UpdateUserParamEndpoint,
  UpdateUserParamReq,
  UpdateUserParamRes,
} from './user.type'

@Controller()
export class UserController {
  private userService = new UserService()

  @Post(SignUpEndpoint)
  async signUp(
    @Req() req: Request<'', '', SignUpReq, ''>,
    @Res() res: Response<SignUpRes>,
  ) {
    const { name, email, password } = req.body
    const getUser = await this.userService.signUp({ name, email, password })
    const token = generateToken(getUser.id)
    return res.json({ user: userSerializer(getUser), token })
  }

  @Get(GetUserEndpoint)
  @Authorized()
  async getUser(
    @Req() req: Request<'', '', '', ''>,
    @Res() res: Response<GetUserRes>,
  ) {
    const id = req.currentUserId!
    const user = await this.userService.getById({ id })
    return res.json({ user: userSerializer(user) })
  }

  @Patch(UpdateUserParamEndpoint)
  @Authorized()
  async updateUserParam(
    @Req() req: Request<'', '', UpdateUserParamReq, ''>,
    @Res() res: Response<UpdateUserParamRes>,
  ) {
    const userId = req.currentUserId!
    const { inputName, inputEmail } = req.body
    const user = await this.userService.updateUserParam({
      userId,
      inputName,
      inputEmail,
    })
    return res.json({ user: userSerializer(user) })
  }
}
