// サーバーからクライアントに送信するイベント
export type ServerToClientEvents = {
  hello: (message: string) => void // 'hello' イベントでサーバーから文字列メッセージを送信
  message: (message: string) => void // 'message' イベントでサーバーからメッセージを送信
}

// クライアントからサーバーに送信するイベント
export type ClientToServerEvents = {
  joinRoom: (data: { roomId: string; userName: string }) => void // ルームに参加するイベント
  sendMessage: (data: {
    roomId: string
    message: string
    userName: string
  }) => void // メッセージを送信するイベント
}
