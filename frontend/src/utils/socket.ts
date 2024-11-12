import io, { Socket } from 'socket.io-client'

export type MessageProps = {
  message: {
    roomId: string
    userName: string
    body: string
    created_at: Date
  }
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

export const sendMessage = ({ message }: MessageProps) => {
  initializeSocket()
  socket?.emit('sendMessage', {
    message,
  })
}

export const receiveMessage = (callback: (message: string) => void) => {
  initializeSocket()
  socket?.on('receive', callback)
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = undefined
  }
}
