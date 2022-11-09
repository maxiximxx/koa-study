import { Context, Next } from 'koa'
import { loginKey } from '../config/constant'
import redisStorage from '../utils/redis'

export default function checkLogin() {
  return async function (ctx: Context, next: Next) {
    if (ctx.url.includes('public')) {
      return await next()
    }
    const { token } = ctx.request.header
    if (!token) {
      return ctx.error(500, null, '暂未登录')
    }

    if (!ctx.user) {
      return ctx.error(401, null, '登录失效')
    }
    const redisToken = await redisStorage.getItem(`${loginKey}${ctx.user}`)
    if (redisToken !== token) {
      ctx.error(401, null, '登录失效')
    } else {
      await next()
    }
  }
}
