import { NextFunction, Request, Response } from 'express'
import { UserService } from '../module/user/user.service'
import { verifyToken, decodeToken } from '../utils/token'

export const setCurrentUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.currentUserId = null
  try {
    const authorization = req.headers.authorization

    if (!authorization) return next()

    const token = authorization.replace('Bearer', '').trim()
    if (!verifyToken(token)) return next()

    const { sub } = decodeToken(token)
    req.currentUserId = sub
  } catch (error) {
    console.log(error)
  }
  next()
}
