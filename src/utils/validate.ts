import { validate } from 'class-validator'
import { CustomError } from '../error/CustomError'

export const validatePassword = (password: string): void => {
  if (password.length < 8)
    throw new CustomError('Password must be at least 8 characters long', 422)
}

export const validateEntity = async (entity: any): Promise<void> => {
  const errors = await validate(entity)
  if (errors.length > 0) throw new CustomError('Entity validation failed', 422)
}
