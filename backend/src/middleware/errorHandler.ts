import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers'
import { Request, Response } from 'express'
import { CustomError } from '../error/CustomError'

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: CustomError, _req: Request, res: Response) {
    console.error(error)
    return res.status(error.status).json({ message: error.message })
  }
}
