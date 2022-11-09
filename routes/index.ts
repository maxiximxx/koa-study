import Router from '@koa/router'
import user from './user'
import publicApi from './public'
import middleware from '../middlewares'

const sleep = (t: number) => new Promise((r) => setTimeout(r, t))

const router = new Router({
  prefix: '/api',
})

router.use(middleware)

router.get('/fetch1', async (ctx) => {
  await sleep(1500)
  ctx.body = {
    code: 500,
    data: 'fetch1',
    msg: 'fetch1 request error',
  }
})

router.get('/fetch2', async (ctx) => {
  await sleep(1500)
  ctx.body = {
    code: 200,
    data: 'fetch2',
    msg: '',
  }
})

router.get('/fetch3', async (ctx) => {
  await sleep(3000)
  ctx.body = {
    code: 200,
    data: 'fetch3',
    msg: 'fetch3 request error',
  }
})

router.use(user)
router.use(publicApi)

router.get('/test', (ctx) => {
  ctx.success(process.env.port)
})

export default router
