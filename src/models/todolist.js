import mongoose from 'mongoose'

const todolistSchema = mongoose.Schema({
  id: String,
  title: String,
  createTime: Number,
  status: String,
  editStatus: String,
})

export const Todolist = mongoose.model('todoList', todolistSchema)
