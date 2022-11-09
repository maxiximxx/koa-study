import {
  body,
  path,
  prefix,
  query,
  request,
  responsesAll,
  summary,
  tagsAll,
} from 'koa-swagger-decorator'
import redisStorage from '../utils/redis'
import { loginKey } from '../config/constant'
import User from '../models/user'
import { Context } from 'koa'
import { userSchema } from '../config/schema'
import { RouterContext } from '@koa/router'

const sleep = () => {
  return new Promise((r) => setTimeout(r, 1000))
}

@responsesAll({
  200: { description: 'success' },
  500: { description: 'server error' },
  401: { description: 'unauthorized' },
})
@tagsAll(['User'])
@prefix('/api/user')
export default class UserController {
  @request('post', '/')
  @summary('创建用户')
  @body(userSchema.create)
  public static async create(ctx: Context) {
    const { username, password } = ctx.request.body
    const user = await User.findOne({ username })
    if (user) {
      ctx.error('用户名已存在')
    } else {
      await User.create({ username, password })
      ctx.success('创建成功')
    }
  }

  @request('delete', '/{username}')
  @summary('删除用户')
  @path(userSchema.delete)
  public static async delete(ctx: RouterContext) {
    const { username } = ctx.params
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
  }

  @request('put', '/')
  @summary('修改用户密码')
  @body(userSchema.update)
  public static async update(ctx: Context) {
    await User.findOneAndUpdate({ username: ctx.user }, ctx.request.body, {
      useFindAndModify: false,
    })
    ctx.success('修改密码成功')
  }

  @request('get', '/')
  @summary('获取用户信息')
  public static async get(ctx: Context) {
    const user = await User.findOne({ username: ctx.user })
    ctx.success(user)
  }

  @request('get', '/list')
  @summary('获取用户列表')
  @query(userSchema.getList)
  public static async getList(ctx: Context) {
    let { page, pageSize = 10 } = ctx.request.query
    const skip = (+(page as string) - 1) * +pageSize
    const list = await User.find({}, null, {
      skip,
      limit: +pageSize,
    })
    ctx.success(list)
  }
}
