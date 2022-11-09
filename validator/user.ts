import Joi from 'joi'

export const userValidator = Joi.object({
  username: Joi.string().max(10).required(),
  password: Joi.string().max(20).required(),
})

export const updateUserValidator = Joi.object({
  password: Joi.string().max(20).required(),
})

export const queryPageValidator = Joi.object({
  page: Joi.number().required(),
})
