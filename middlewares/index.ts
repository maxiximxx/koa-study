import koaBody from 'koa-body'
import compose from 'koa-compose'
import checkLogin from './checkLogin'
import patchCtx from './patchCtx'
import unhandledRejection from './unhandledRejection'
import logger from './logger'
import catchError from './catchError'

const middleware = compose([
  catchError(),
  koaBody(),
  logger(),
  patchCtx(),
  checkLogin(),
])

export default middleware
