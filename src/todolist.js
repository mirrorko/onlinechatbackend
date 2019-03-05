const Todolist = require('./models/todolist')
class SocketHander {
  constructor() {
    this.db
  }

  connect() {
    this.db = require('mongoose').connect('mongodb://localhost:27017')
    this.db.Promise = global.Promise
    return this
  }

  getTodolists() {
    return Todolist.find()
  }

  storeTodolists(data, res) {
    console.log(data)
    const newTodolist = new Todolist({
      id: data.id,
      title: data.title,
      createTime: data.createTime,
      status: data.status,
    })

    const doc = newTodolist.save(function(err) {
      if (err) res.send(err)

      res.json({ message: 'Todoitem created!' })
    })
  }
}

module.exports = SocketHander
