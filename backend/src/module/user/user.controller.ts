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
  GetByIdEndpoint,
  GetByIdParam,
  GetByIdRes,
  GetEndpoint,
  GetRes,
  SignUpEndpoint,
  SignUpReq,
  SignUpRes,
  UpdateParamReq,
  UpdateParamRes,
  UpdateUserIconEndpoint,
  UpdateUserIconRes,
  UpdateUserParamEndpoint,
} from './user.type'
import { upload } from '../../lib/imageUpload'

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

  @Get(GetEndpoint)
  @Authorized()
  async getUser(
    @Req() req: Request<'', '', '', ''>,
    @Res() res: Response<GetRes>,
  ) {
    const id = req.currentUserId!
    const user = await this.userService.getById({ id })
    return res.json({ user: userSerializer(user) })
  }

  @Get(GetByIdEndpoint)
  async getUserById(
    @Req() req: Request<GetByIdParam, '', '', ''>,
    @Res() res: Response<GetByIdRes>,
  ) {
    const { id } = req.params
    const user = await this.userService.getById({ id })
    return res.json({ user: userSerializer(user) })
  }

  @Patch(UpdateUserParamEndpoint)
  @Authorized()
  async updateParam(
    @Req() req: Request<'', '', UpdateParamReq, ''>,
    @Res() res: Response<UpdateParamRes>,
  ) {
    const userId = req.currentUserId!
    const { inputName, inputEmail } = req.body
    const user = await this.userService.updateParam({
      userId,
      inputName,
      inputEmail,
    })
    return res.json({ user: userSerializer(user) })
  }

  @Patch(UpdateUserIconEndpoint)
  @Authorized()
  async updateUserIcon(
    @Req() req: Request,
    @Res() res: Response<UpdateUserIconRes>,
  ) {
    const userId = req.currentUserId!
    const url = await upload(req, res, '/userIcon')
    const updateUser = await this.userService.updateParam({
      userId,
      inputIconUrl: url.url,
    })
    return res.json({ user: userSerializer(updateUser) })
  }
}
