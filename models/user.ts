import mongoose from 'mongoose'
const { Schema } = mongoose

export const UserSchema = new Schema({
  username: {
    type: String,
    maxLength: 10,
    required: true,
  },
  password: {
    type: String,
    maxLength: 20,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

export default User
