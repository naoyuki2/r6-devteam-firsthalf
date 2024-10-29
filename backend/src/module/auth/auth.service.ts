import { AppDataSource } from '../../app-data-source'
import { verifyPassword } from '../../lib/hash'
import { User } from '../user/user.entity'

const userRepository = AppDataSource.getRepository(User)

type SignInProps = {
  email: string
  password: string
}

export class AuthService {
  async signIn({ email, password }: SignInProps): Promise<User> {
    const user = await userRepository.findOneByOrFail({ email })
    await verifyPassword(user.password, password)
    return user
  }
}
