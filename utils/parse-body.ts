import { Context, Next } from 'koa'

export default function parseBody(ctx: Context, next: Next) {
  return new Promise(function (resolve, reject) {
    try {
      let body = ''
      ctx.req.on('data', function (data) {
        body += data
      })
      ctx.req.on('end', async function () {
        resolve(body ? JSON.parse(body) : '')
      })
    } catch (e) {
      reject(e)
    }
  })
}
