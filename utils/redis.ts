import redis from 'redis'
import { redisConfig } from '../config/constant'

const client = redis.createClient(redisConfig)

client.on('error', (err) => {
  console.error(err)
})

client.info(() => console.log('redis connected'))

class redisStorage {
  constructor() {}

  /**
   * expire 单位是分钟
   */

  static setItem(
    key: string,
    value: string,
    expire: number = 60
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err) => {
        if (err) {
          reject(err)
        } else {
          if (expire && expire > 0) {
            client.expire(key, expire * 60, (err) => {
              if (err) reject(err)
            })
          }
          resolve()
        }
      })
    })
  }

  static getItem(key: string) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, value) => {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    })
  }

  static removeItem(key: string | string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      client.del(key, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

export default redisStorage
