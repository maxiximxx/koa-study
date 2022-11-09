export const publicSchema = {
  login: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
    },
    password: {
      type: 'string',
      description: '密码',
      required: true,
    },
  },
}

export const userSchema = {
  create: publicSchema.login,
  delete: { username: publicSchema.login.username },
  update: { password: publicSchema.login.password },
  getList: {
    page: {
      type: 'number',
      description: '页数',
      required: true,
    },
    pageSize: {
      type: 'number',
      description: '条数',
      default: 10,
    },
  },
}
