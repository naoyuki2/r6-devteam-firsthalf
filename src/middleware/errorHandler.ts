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
    return res.json({
      message: error.message || 'Internal server error',
      status: error.status,
    })
  }
}
