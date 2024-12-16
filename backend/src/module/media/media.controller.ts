import { Controller, Get, Req, Res } from 'routing-controllers'
import { MediaEndpoint, MediaResponse } from './media.type'
import { Request, Response } from 'express'
import { upload } from '../../lib/imageUpload'

@Controller()
export class MediaController {
  @Get(MediaEndpoint)
  async get(@Req() req: Request, @Res() res: Response<MediaResponse>) {
    const imageUrl = (await upload(req, res, 'uploads')).url

    return res.json({ imageUrl })
  }
}
