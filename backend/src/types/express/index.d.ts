import { User } from 'src/module/user/user.entity'

declare global {
  namespace Express {
    interface Request {
      currentUser?: User | null
    }
  }
}
