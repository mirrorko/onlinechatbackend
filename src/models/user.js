import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  fb_id: String,
  socket_id: String,
  get_message_time: { type: Number, default: null },
  login_time: { type: Number, default: null },
})

export const Users = mongoose.model('Users', userSchema)
