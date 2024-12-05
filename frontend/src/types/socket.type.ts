export type JoinRoomProps = { roomId: string }

export type SendMessageProps = {
  message: {
    id: number
    roomId: string
    userId: number
    body: string
    created_at: Date
  }
}

export type ReceiveMessageProps = {
  message: {
    id: number
    roomId: string
    userId: number
    body: string
    created_at: Date
  }
}

export type UpdateStatusProps = {
  updateStatus: {
    status: string
    roomId: string
  }
}
