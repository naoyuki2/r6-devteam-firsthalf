import express from 'express'
import { Action, useExpressServer } from 'routing-controllers'
import { AppDataSource } from './app-data-source'
import { RequestController } from './module/request/request.controller'
import { UserController } from './module/user/user.controller'
import { AuthController } from './module/auth/auth.controller'
import { ErrorHandler } from './middleware/errorHandler'
import { setCurrentUser } from './middleware/setCurrentUser'
import cors from 'cors'
import { RoomController } from './module/room/room.controller'

import { MessageController } from './module/message/message.controller'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { ClientToServerEvents, ServerToClientEvents } from './lib/socket.type'
import { CustomError } from './error/CustomError'
import { DraftRequestController } from './module/draft_request/draft_request.controller'
import { RoomUserController } from './module/room_user/room_user.controller'

const PORT = process.env.PORT || 3030

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(setCurrentUser)

useExpressServer(app, {
  controllers: [
    RequestController,
    UserController,
    AuthController,
    RoomController,
    MessageController,
    DraftRequestController,
    RoomUserController,
  ],
  middlewares: [ErrorHandler],
  defaultErrorHandler: false,
  authorizationChecker: (action: Action) => {
    const currentUserId = action.request.currentUserId
    if (currentUserId == null) throw new CustomError('Unauthorized user', 401)
    return currentUserId
  },
})

export const httpServer = createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  // ルームに参加する処理
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId)
  })

  // クライアントからのメッセージ受信処理
  socket.on('sendMessage', ({ message }) => {
    io.to(message.roomId).emit('receiveMessage', { message })
  })

  socket.on('updateStatus', ({ roomId, status }) => {
    io.to(roomId).emit('statusUpdated', status)
  })

  // 切断イベント受信
  socket.on('disconnect', () => {})
})

// サーバーの起動
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
