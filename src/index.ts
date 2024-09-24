import express from 'express'
import { createExpressServer } from 'routing-controllers'
import path from 'path'
import { AppDataSource } from './app-data-source'
import { OrderController } from './module/order/order.controller'
import { RouteController } from './module/route/route.controller'

const PORT = 3000

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app = createExpressServer({
  controllers: [RouteController, OrderController],
})
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, '../node_modules/bootstrap/dist')),
)
app.use(
  '/icons',
  express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font')),
)
app.use('/css', express.static(path.join(__dirname, '../public/css')))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
