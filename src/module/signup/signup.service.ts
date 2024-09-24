import { getRepository } from 'typeorm';
import { hash } from '../../lib/hash';  // hash関数をインポート
import { User } from '../entities/User';

export class SignupService {
  async registerUser(username: string, email: string, password: string, icon_image_url: string) {
    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('このメールアドレスは既に登録されています。');
    }
    const hashedPassword = await hash(password);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    return user;
  }
}
