import { Context, Next } from 'koa'
import { loginKey } from '../config/constant'
import redisStorage from '../utils/redis'

export default function patchCtx() {
  return async function patch(ctx: Context, next: Next) {
    const success = (...args: any[]) => {
      if (!args.length) {
        ctx.body = {
          code: 200,
          data: null,
          message: '',
        }
      } else {
        ctx.body = {
          code: 200,
          data: args[0],
          message: args[1] || '',
        }
      }
    }

    const error = (...args: any[]) => {
      if (args.length === 3) {
        ctx.status = args[0]
        ctx.body = {
          code: args[0],
          data: args[1],
          message: args[2],
        }
      } else if (args.length === 2) {
        ctx.body = {
          code: 500,
          data: args[0],
          message: args[1],
        }
      } else if (args.length === 1) {
        ctx.body = {
          code: 500,
          data: null,
          message: args[0],
        }
      }
    }

    const { token } = ctx.request.header
    const user = JSON.parse(
      (await redisStorage.getItem(`${loginKey}${token}`)) as string
    )
    
    ctx.user = user?.username || null
    ctx.success = success
    ctx.error = error
    return await next()
  }
}
