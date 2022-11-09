import Router from '@koa/router'
import { validator } from 'koa-router-joi-validator'
import { loginKey } from '../config/constant'
import User from '../models/user'
import redisStorage from '../utils/redis'
import { userValidator } from '../validator/user'

const router = new Router({ prefix: '/user' })

router.post('/', validator(userValidator), async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await User.findOne({ username })
  if (user) {
    ctx.error('用户名已存在')
  } else {
    await User.create({ username, password })
    ctx.success('创建成功')
  }
})

router.delete('/', async (ctx) => {
  const { username } = ctx.request.query
  if (username === 'admin') {
    return ctx.error('不能删除自己')
  }
  if (ctx.user === 'admin') {
    const { deletedCount } = await User.deleteOne({ username })
    if (deletedCount) {
      const token = await redisStorage.getItem(`${loginKey}${username}`)
      await redisStorage.removeItem(`${loginKey}${username}`)
      await redisStorage.removeItem(`${loginKey}${token}`)
      ctx.success('删除成功')
    } else {
      ctx.error('没有用户')
    }
  } else {
    ctx.error('没有权限')
  }
})

router.put(
  '/',
  validator({ password: userValidator.password }),
  async (ctx) => {
    await User.findOneAndUpdate({ username: ctx.user }, ctx.request.body, {
      useFindAndModify: false,
    })
    ctx.success('修改密码成功')
  }
)

router.get('/', async (ctx) => {
  const user = await User.findOne({ username: ctx.user })
  ctx.success(user)
})

export default router.routes()
