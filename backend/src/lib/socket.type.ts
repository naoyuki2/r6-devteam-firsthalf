type JoinRoomProps = { roomId: string }

type SendMessageProps = {
  message: {
    id: number
    roomId: string
    userId: number
    body: string
    created_at: Date
  }
}

type ReceiveMessageProps = {
  message: {
    id: number
    roomId: string
    userId: number
    body: string
    created_at: Date
  }
}

type UpdateStatusProps = {
  status: string
  roomId: string
}

// サーバーからクライアントに送信するイベント
export type ServerToClientEvents = {
  receiveMessage: (message: ReceiveMessageProps) => void
  statusUpdated: (updateStatus: string) => void
}

// クライアントからサーバーに送信するイベント
export type ClientToServerEvents = {
  // dataけすな！！その中にオブジェクトを書いてindex側で{}受け取る
  joinRoom: (data: JoinRoomProps) => void
  sendMessage: (data: SendMessageProps) => void
  updateStatus: (data: UpdateStatusProps) => void
}
