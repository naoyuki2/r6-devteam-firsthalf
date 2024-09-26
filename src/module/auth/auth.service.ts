import { AppDataSource } from '../../app-data-source'
import { verifyPassword } from '../../lib/hash'
import { User } from '../user/user.entity'
import { signInParams } from './auth.type'

const userRepository = AppDataSource.getRepository(User)

export class AuthService {
  async signIn({ email, password }: signInParams): Promise<User> {
    const existingUser = await userRepository.findOne({ where: { email } })

    if (!existingUser) {
      throw new Error('User not found')
    }

    const isVerify = await verifyPassword(existingUser.password, password)

    if (!isVerify) {
      throw new Error('Invalid password')
    }
    return existingUser
  }
}
