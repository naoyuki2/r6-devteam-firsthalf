import {
  JoinRoomProps,
  ReceiveMessageProps,
  SendMessageProps,
  UpdateStatusProps,
} from '@/types/socket.type'
import io, { Socket } from 'socket.io-client'

let socket: Socket | undefined

const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3030')
  }
}

export const joinRoom = ({ roomId }: JoinRoomProps) => {
  initializeSocket()
  socket?.emit('joinRoom', { roomId })
}

export const sendMessage = ({ message }: SendMessageProps) => {
  initializeSocket()
  socket?.emit('sendMessage', {
    message,
  })
}

export const receiveMessage = (
  callback: ({ message }: ReceiveMessageProps) => void
) => {
  initializeSocket()
  socket?.on('receiveMessage', callback)
}

export const updateStatus = ({
  status,
  roomId,
}: {
  status: string
  roomId: string
}) => {
  initializeSocket()
  socket?.emit('updateStatus', { status, roomId })
}

export const onStatusUpdate = (
  callback: (data: { status: string }) => void
) => {
  initializeSocket()
  socket?.on('statusUpdated', callback)
}
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = undefined
  }
}
