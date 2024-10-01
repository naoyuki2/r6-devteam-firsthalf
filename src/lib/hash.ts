import * as argon2 from 'argon2'
import { CustomError } from '../error/CustomError'

export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password)
}

export const verifyPassword = async (
  hash: string,
  password: string,
): Promise<void> => {
  const isVerify = await argon2.verify(hash, password)
  if (!isVerify) throw new CustomError('Invalid password')
}
