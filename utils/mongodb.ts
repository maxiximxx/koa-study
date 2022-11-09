import mongoose from 'mongoose'
import { mongodbConfig } from '../config/constant'

mongoose.connect(mongodbConfig.url, mongodbConfig.options)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('mongodb connected')
})

export default db
