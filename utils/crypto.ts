import crypto, { randomBytes, scryptSync } from 'crypto'

const data = '123'
const algorithm = 'aes-192-cbc'
const password = scryptSync('maxixi', 'mxx', 24)

// bcrypt

// bcyrpt(password) => hashed_password
// bcrypt(123456) => abcedfg
// bcrypt(123456) => abcdeff(salt...)

// verify(hashed_password, password) => result

// 123456 => asdfasdf
// md5(123456+salt) =>

// asdfasdf ==> 123456
// jwqerjqwlke ==> 1234567
// 加密
function encrypt(data: string) {
  const iv = randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, password, iv)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return { encrypted, iv }
}

// 解密
function decrypt(data: string, iv: crypto.BinaryLike) {
  const decipher = crypto.createDecipheriv(algorithm, password, iv)
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  console.log(decrypted)
  return decrypted
}

const a = encrypt(data)
console.log(a)

const b = encrypt('usususu')
console.log(b)

decrypt(a.encrypted, a.iv)
decrypt(b.encrypted, b.iv)
