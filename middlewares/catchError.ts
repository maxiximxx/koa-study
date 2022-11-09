import { Context, Next } from 'koa'

export default function catchError() {
  return async function (ctx: Context, next: Next) {
    try {
      await next()
    } catch (error: any) {
      ctx.status = 500
      ctx.body = {
        code: 500,
        data: null,
        message: error?.message || error,
      }
    }
  }
}
