// サーバーからクライアントに送信するイベント
export type ServerToClientEvents = {
  hello: (message: string) => void
  receive: (message: string) => void
}

// クライアントからサーバーに送信するイベント
export type ClientToServerEvents = {
  joinRoom: (data: { roomId: string; userName: string }) => void
  sendMessage: (data: {
    message: {
      roomId: string
      userName: string
      body: string
      created_at: Date
    }
  }) => void
}
