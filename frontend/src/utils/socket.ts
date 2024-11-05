import io, { Socket } from 'socket.io-client'

export type MessageProps = {
  roomId: string
  body: string
  userName: string
}

let socket: Socket | undefined

const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3030')
  }
}

export const joinRoom = (roomId: string) => {
  initializeSocket()
  socket?.emit('joinRoom', { roomId })
}

export const sendMessage = ({ roomId, body, userName }: MessageProps) => {
  initializeSocket()
  socket?.emit('sendMessage', { roomId, message: body, userName })
}

export const receiveMessage = (callback: (message: string) => void) => {
  initializeSocket()
  socket?.on('message', callback)
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = undefined
  }
}
