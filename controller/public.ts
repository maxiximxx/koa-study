import {
  body,
  middlewares,
  prefix,
  request,
  responsesAll,
  summary,
  tagsAll,
} from 'koa-swagger-decorator'
import uid from '../utils/uid'
import redisStorage from '../utils/redis'
import { ADMIN_USER, loginKey } from '../config/constant'
import User from '../models/user'
import { Context } from 'koa'
import { publicSchema } from '../config/schema'

const sleep = () => {
  return new Promise((r) => setTimeout(r, 3000))
}

@responsesAll({
  200: { description: 'success' },
  500: { description: 'server error' },
  401: { description: 'unauthorized' },
})
@tagsAll(['Public'])
@prefix('/api/public')
export default class PublicController {
  @request('post', '/login')
  @summary('登录')
  @body(publicSchema.login)
  public static async login(ctx: Context) {
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
  }

  @request('post', '/create-admin')
  @summary('内部接口 --> 创建管理员')
  public static async createAdmin(ctx: Context) {
    const user = await User.findOne({ username: ADMIN_USER.username })
    if (user) {
      return ctx.error('admin 已存在')
    }
    await User.create(ADMIN_USER)
    ctx.success('创建成功')
  }
}
