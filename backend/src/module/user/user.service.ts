import { AppDataSource } from '../../app-data-source'
import { hashPassword } from '../../lib/hash'
import { validateEntity, validatePassword } from '../../utils/validate'
import { User } from './user.entity'

const userRepository = AppDataSource.getRepository(User)

type SignUpProps = {
  name: string
  email: string
  password: string
}

type GetByIdProps = {
  id: number
}

export class UserService {
  async signUp({ name, email, password }: SignUpProps): Promise<User> {
    validatePassword(password)
    const hashedPassword = await hashPassword(password)
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    await validateEntity(user)
    return await userRepository.save(user)
  }

  async getById({ id }: GetByIdProps): Promise<User> {
    return await userRepository.findOneByOrFail({ id })
  }
}
