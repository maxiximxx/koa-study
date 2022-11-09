import Koa from 'koa'
import { serverConfig } from './config/constant'
import swaggerRouter from './docs'
import router from './routes'
import './utils/mongodb'

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())
app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())

app.listen(serverConfig.port, () => {
  console.log(`server run on ${serverConfig.port} port`)
})
