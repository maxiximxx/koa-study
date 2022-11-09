import { Context, Next } from 'koa'

export default function unhandledRejection() {
  return function (ctx: Context, next: Next) {
    process.on('uncaughtException', (reason: string, p: Promise<any>) => {
      console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
      // application specific logging, throwing an error, or other logic here
      ctx.error(reason)
    })
    return next()
  }
}
