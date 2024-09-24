import { generateToken } from '../../utils/token';

export class AuthService {
  private jwtSecret = 'your_jwt_secret'; // JWT秘密鍵を設定

  generateToken(userId: number): string {
    return generateToken(userId, this.jwtSecret);
  }
}
