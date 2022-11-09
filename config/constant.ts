export const ADMIN_USER = {
  username: 'admin',
  password: '123456',
}

console.log(process.env.port, '环境变量')

export const serverConfig = {
  port: process.env.port || 4000,
}

export const redisConfig = {
  host: '127.0.0.1',
  port: 6379,
  connect_timeout: 60000,
}

export const mongodbConfig = {
  url: 'mongodb://localhost:27017/mxx',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
}

export const loginKey = 'koa:mxx:login:'
