"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _todolist = require("./models/todolist");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Todolist = require('./todolist')
var whitelist = ['http://localhost:5566'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    callback(null, true); // if (whitelist.includes(origin)) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }
};
var app = (0, _express.default)();
app.use((0, _cors.default)(corsOptions));

_mongoose.default.connect('mongodb://localhost:27017' // { useNewUrlParser: true },
);

app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
var port = process.env.PORT || 8080;

var router = _express.default.Router(); // this is a middleware
// router.use((req, res, next) => {
//   console.log('Something is happening.')
//   next()
// })


router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});
router.route('/todolist') // create a bear (accessed at POST http://localhost:8080/api/bears)
.post(function (req, res) {
  var todoitem = new _todolist.Todolist(); // const todoitem = {}

  todoitem.title = req.body.title;
  todoitem.createTime = req.body.createTime;
  todoitem.status = req.body.status;
  todoitem.editStatus = req.body.editStatus;
  todoitem.save(function (err) {
    if (err) res.send(err);
    res.json({
      message: 'Todoitem created!'
    });
  }); // const todolist = new Todolist()
  // todolist.connect().storeTodolists(todoitem, res)
}) // get all the bears (accessed at GET http://localhost:8080/api/bears)
.get(function (req, res) {
  _todolist.Todolist.find(function (err, list) {
    if (err) res.send(err);
    res.json(list);
  });
});
router.route('/todolist/:id').get(function (req, res) {
  _todolist.Todolist.findById(req.params.id, function (err, list) {
    if (err) res.send(err);
    res.json(list);
  });
}).put(function (req, res) {
  // use our bear model to find the bear we want
  _todolist.Todolist.findById(req.params.id, function (err, Todoitem) {
    console.log(req.body.status);
    if (err) res.send(err);

    if (req.body.title) {
      Todoitem.title = req.body.title;
    } // update the bears info


    Todoitem.status = req.body.status; // save the bear

    Todoitem.save(function (err) {
      if (err) res.send(err);
      res.json({
        message: 'Todoitem updated!'
      });
    });
  });
}).delete(function (req, res) {
  _todolist.Todolist.remove({
    _id: req.params.id
  }, function (err, Todoitem) {
    if (err) res.send(err);
    res.json({
      message: 'Successfully deleted'
    });
  });
});
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);