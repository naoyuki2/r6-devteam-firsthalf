import express from 'express'
import { Action, useExpressServer } from 'routing-controllers'
import { AppDataSource } from './app-data-source'
import { RequestController } from './module/request/request.controller'
import { UserController } from './module/user/user.controller'
import { AuthController } from './module/auth/auth.controller'
import { ErrorHandler } from './middleware/errorHandler'
import { setCurrentUser } from './middleware/setCurrentUser'

const PORT = 3030

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(setCurrentUser)

useExpressServer(app, {
  controllers: [RequestController, UserController, AuthController],
  middlewares: [ErrorHandler],
  defaultErrorHandler: false,
  authorizationChecker: (action: Action, roles: string[]) => {
    return action.request.currentUser
  },
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
