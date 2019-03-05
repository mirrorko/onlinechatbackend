import mongoose from 'mongoose'

const messagesSchema = mongoose.Schema({
  id: String,
  user_id: String,
  user_name: String,
  fb_id: String,
  msg: String,
  createTime: Number,
})

export const Messages = mongoose.model('Messages', messagesSchema)
