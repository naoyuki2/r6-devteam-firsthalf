declare global {
  namespace Express {
    interface Request {
      currentUserId?: number | null
    }
  }
}

export {}
