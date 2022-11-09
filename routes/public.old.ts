import Router from '@koa/router'
import { validator } from 'koa-router-joi-validator'
import { userValidator } from '../validator/user'
import uid from '../utils/uid'
import redisStorage from '../utils/redis'
import { ADMIN_USER, loginKey } from '../config/constant'
import User from '../models/user'

const router = new Router({ prefix: '/public' })

router.post('/login', validator(userValidator), async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await User.findOne({ username })
  if (user && user.password === password) {
    const token = uid()
    await redisStorage.setItem(`${loginKey}${username}`, token)
    await redisStorage.setItem(
      `${loginKey}${token}`,
      JSON.stringify({ username, password })
    )
    ctx.success(token)
  } else {
    ctx.error('账号密码不正确')
  }
})

router.post('/create-admin', async (ctx) => {
  await User.create(ADMIN_USER)
  ctx.success()
})

export default router.routes()
