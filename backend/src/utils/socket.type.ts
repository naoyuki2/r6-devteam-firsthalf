import axios from 'axios'
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
    userId: number
  }) => void
}
//メッセージを登録するAPI
export async function create(roomId: string, message: string, userId: number) {
  try {
    const response = await axios.post('http://localhost:3030/messages', {
      body: message,
      roomId: roomId,
      userId: userId,
    })
    return response.data
  } catch (error) {
    console.error('Failed to call message API:', error)
    throw error
  }
}
