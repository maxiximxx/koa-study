import Joi from 'joi'
import { Context, Next } from 'koa'

export enum validType {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params',
}

export default function validator(
  schema: Joi.ObjectSchema,
  type: validType = validType.BODY
) {
  return async function (ctx: Context, next: Next) {
    if (!Joi.isSchema(schema)) {
      throw new Error('schema is not a Joi schema!')
    } else {
      const data = type === validType.BODY ? ctx.request.body : ctx[type]
      const { error } = schema.validate(data, { allowUnknown: true })
      if (error) {
        throw error
      } else {
        return await next()
      }
    }
  }
}
