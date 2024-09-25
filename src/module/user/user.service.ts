import { AppDataSource } from '../../app-data-source'
import { hash } from '../../lib/hash'
import { User } from './user.entity'
import { signUpParams } from './user.type'

const userRepository = AppDataSource.getRepository(User)

export class UserService {
  async signup({ name, email, password }: signUpParams): Promise<User> {
    const existingUser = await userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('このメールアドレスは既に登録されています。')
    }
    const hashedPassword = await hash(password)
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return await userRepository.save(user)
  }
}
