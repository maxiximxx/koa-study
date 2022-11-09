import { SwaggerRouter } from 'koa-swagger-decorator'
import path from 'path'

const swaggerRouter = new SwaggerRouter()

swaggerRouter.swagger({
  title: 'koa demo',
  description: 'api docs',
  version: '1.0.0',
  // prefix: '/api',
  swaggerOptions: {
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'token',
      },
    },
  },
})

swaggerRouter.mapDir(path.join(__dirname, '../controller'))

export default swaggerRouter
