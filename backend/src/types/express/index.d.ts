import { User } from 'src/module/user/user.entity'

declare global {
  namespace Express {
    interface Request {
      currentUserId?: number | null
    }
  }
}
