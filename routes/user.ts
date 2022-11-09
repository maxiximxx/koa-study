import Router from '@koa/router'
import UserController from '../controller/user'
import {
  queryPageValidator,
  userValidator,
  updateUserValidator,
} from '../validator/user'
import validator, { validType } from '../middlewares/validator'

const router = new Router({ prefix: '/user' })

router.get('/', UserController.get)
router.post('/', validator(userValidator), UserController.create)
router.put('/', validator(updateUserValidator), UserController.update)
router.delete('/:username', UserController.delete)
router.get(
  '/list',
  validator(queryPageValidator, validType.QUERY),
  UserController.getList
)

export default router.routes()
