import express from 'express'
import { Action, useExpressServer } from 'routing-controllers'
import { AppDataSource } from './app-data-source'
import { RequestController } from './module/request/request.controller'
import { UserController } from './module/user/user.controller'
import { AuthController } from './module/auth/auth.controller'
import { ErrorHandler } from './middleware/errorHandler'
import { setCurrentUser } from './middleware/setCurrentUser'
import { Server } from 'socket.io'
import cors from 'cors'
import { RoomController } from './module/room/room.controller'
import { createServer } from 'http'
import { ClientToServerEvents, ServerToClientEvents } from './utils/soket.type'

const PORT = 3030

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
  ],
  middlewares: [ErrorHandler],
  defaultErrorHandler: false,
  authorizationChecker: (action: Action, roles: string[]) => {
    return action.request.currentUserId
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
  console.log('ユーザーが接続しました', socket.id)

  // ルームに参加する処理
  socket.on('joinRoom', ({ roomId, userName }) => {
    socket.join(roomId)
    console.log(`ユーザー: ${userName} がルームID: ${roomId} に参加しました`)

    // ルーム内の全員に参加メッセージを通知
    io.to(roomId).emit('message', `${userName} joined the room.`)
  })

  // クライアントからのメッセージ受信処理
  socket.on('sendMessage', ({ roomId, message, userName }) => {
    console.log(`${userName} sent a message: ${message} to room ${roomId}`)

    // ルーム内の全員にメッセージを送信
    io.to(roomId).emit('message', `${userName}: ${message}`)
  })

  // 切断イベント受信
  socket.on('disconnect', (reason) => {
    console.log(`user disconnected. reason is ${reason}.`)
  })
})

// サーバーの起動
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
