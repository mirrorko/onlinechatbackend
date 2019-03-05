import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import { Todolist } from './models/todolist'
// const Todolist = require('./todolist')

const whitelist = ['http://localhost:5566']
const corsOptions = {
  origin: function(origin, callback) {
    callback(null, true)
    // if (whitelist.includes(origin)) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  },
}

const app = express()

app.use(cors(corsOptions))
mongoose.connect(
  'mongodb://localhost:27017',
  // { useNewUrlParser: true },
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
const router = express.Router()

// this is a middleware
// router.use((req, res, next) => {
//   console.log('Something is happening.')
//   next()
// })

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' })
})

router
  .route('/todolist')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post((req, res) => {
    var todoitem = new Todolist()
    // const todoitem = {}

    todoitem.title = req.body.title
    todoitem.createTime = req.body.createTime
    todoitem.status = req.body.status
    todoitem.editStatus = req.body.editStatus
    todoitem.save(err => {
      if (err) res.send(err)
      res.json({
        message: 'Todoitem created!',
      })
    })

    // const todolist = new Todolist()

    // todolist.connect().storeTodolists(todoitem, res)
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get((req, res) => {
    Todolist.find((err, list) => {
      if (err) res.send(err)
      res.json(list)
    })
  })
router
  .route('/todolist/:id')

  .get((req, res) => {
    Todolist.findById(req.params.id, (err, list) => {
      if (err) res.send(err)
      res.json(list)
    })
  })
  .put((req, res) => {
    // use our bear model to find the bear we want

    Todolist.findById(req.params.id, (err, Todoitem) => {
      console.log(req.body.status)
      if (err) res.send(err)
      if (req.body.title) {
        Todoitem.title = req.body.title
      }
      // update the bears info
      Todoitem.status = req.body.status
      // save the bear
      Todoitem.save(err => {
        if (err) res.send(err)

        res.json({ message: 'Todoitem updated!' })
      })
    })
  })
  .delete((req, res) => {
    Todolist.remove(
      {
        _id: req.params.id,
      },
      (err, Todoitem) => {
        if (err) res.send(err)
        res.json({ message: 'Successfully deleted' })
      },
    )
  })

app.use('/api', router)
app.listen(port)
console.log('Magic happens on port ' + port)
