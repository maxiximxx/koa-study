import swaggerJSDoc from 'swagger-jsdoc'
import { koaSwagger } from 'koa2-swagger-ui'
import Router from '@koa/router'
import path from 'path'

const router = new Router({
  prefix: '/swagger',
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'koa-demo-api',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, '../service/*.ts')], // files containing annotations as above
}

const openapiSpecification = swaggerJSDoc(options)

router.get('/json', (ctx) => {
  ctx.body = openapiSpecification
})

const koaSwaggerUi = koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger/json',
  },
})

router.get('/', koaSwaggerUi)

export default router
