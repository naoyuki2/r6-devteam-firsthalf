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

type UpdateParamProps = {
  userId: number
  inputName?: string
  inputEmail?: string
  inputIconUrl?: string
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

  async updateParam({
    userId,
    inputName,
    inputEmail,
    inputIconUrl,
  }: UpdateParamProps): Promise<User> {
    const user = await userRepository.findOneByOrFail({ id: userId })
    if (inputName !== undefined) {
      user.name = inputName
    }

    if (inputEmail !== undefined) {
      user.email = inputEmail
    }

    if (inputIconUrl !== undefined) {
      user.icon_image_url = inputIconUrl
    }

    await validateEntity(user)
    return await userRepository.save(user)
  }
}
