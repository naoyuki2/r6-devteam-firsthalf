import { AppDataSource } from '../../app-data-source'
import { hash } from '../../lib/hash'
import { User } from './user.entity'

const userRepository = AppDataSource.getRepository(User)

type createAccountParams = {
  name: string
  email: string
  password: string
}

export class UserService {
  async signup({ name, email, password }: createAccountParams): Promise<User> {
    console.log(name, email, password)
    const existingUser = await userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('このメールアドレスは既に登録されています。')
    }
    console.log('ハッシュ化します')
    const hashedPassword = await hash(password)
    console.log('ハッシュ化通ったよ')
    const user = new User()
    user.name = name
    user.email = email
    user.password = hashedPassword

    await userRepository.save(user)

    return user
  }
}
