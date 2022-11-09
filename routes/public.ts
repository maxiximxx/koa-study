import Router from '@koa/router'
import PublicController from '../controller/public'
import validator from '../middlewares/validator'
import { userValidator } from '../validator/user'

const router = new Router({ prefix: '/public' })

router.post('/login', validator(userValidator), PublicController.login)
router.post('/create-admin', PublicController.createAdmin)

export default router.routes()
