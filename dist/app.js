"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _messages = require("./models/messages");

var _user = require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import https from 'https'
var app = (0, _express.default)();

var server = _http.default.Server(app);

var PORT = process.env.PORT || 2266; // const server = https.Server(
//   {
//     requestCert: false,
//     rejectUnauthorized: false,
//   },
//   app,
// )

var io = (0, _socket.default)(server);

var router = _express.default.Router();

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    callback(null, true); // if (whitelist.includes(origin)) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }
};
app.use((0, _expressSession.default)({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));
app.use((0, _cors.default)(corsOptions));

_mongoose.default.connect('mongodb://localhost:27017' // 'mongodb://localhost:27017',
// { useNewUrlParser: true },
);

app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/', function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>expires in: ' + req.session.cookie.maxAge / 1000 + 's</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('welcome to the session demo. refresh!');
  }
}); // router.get('/', function(req, res) {
//   res.json({ message: 'Api start' })
// })

router.route('/chat').post(function (req, res) {
  console.log('chat');

  var query = _messages.Messages.find({
    createTime: {
      $lte: Date.now()
    }
  }, null, {
    limit: 10,
    sort: {
      createTime: -1 //Sort by Date Added DESC

    }
  });

  query.exec(function (err, list) {
    if (err) res.send(err);
    res.json(list.reverse());
  });
});
router.route('/chat/remove').get(function (req, res) {
  _messages.Messages.remove({}, function (err) {
    res.json({
      message: 'Remove!'
    });
  });
});
router.route('/user').get(function (req, res) {
  _user.Users.find(function (err, list) {
    if (err) res.send(err);
    res.json(list);
  });
});
router.route('/user/remove').get(function (req, res) {
  _user.Users.remove({}, function (err) {
    res.json({
      message: 'Remove!'
    });
  });
});

var user_getmessage_time = function user_getmessage_time(fb_id) {
  console.log('user_getmessage_time' + fb_id);

  _user.Users.findOne({
    fb_id: fb_id
  }, function (err, user) {
    console.log(err);

    if (user) {
      console.log(user);
      user.get_message_time = Date.now();
      user.save(function (err) {
        if (err) console.log(err);
      });
    }
  });
};

var user_login_time = function user_login_time(data, socket_id) {
  console.log('user_login_time' + data.fb_id);
  var fb_id = data.fb_id;

  _user.Users.findOne({
    fb_id: fb_id
  }, function (err, user) {
    console.log(user);

    if (!user) {
      console.log('no user');
      var userData = new _user.Users();
      userData.name = 'mirror';
      userData.email = 'mirror790907@gmail.com';
      userData.fb_id = fb_id;
      userData.socket_id = socket_id;
      userData.login_time = Date.now();
      userData.save(function (err) {
        if (err) console.log(err);
        console.log('new fb id ' + fb_id);
      });
    } else {
      user.login_time = Date.now();
      user.save(function (err) {
        if (err) console.log(err);
      });
    }
  });

  return fb_id;
};

io.on('connection', function (socket) {
  console.log('a user connected');
  console.log(socket.id);
  socket.on('user', function (data) {
    console.log('socket on user :' + data.fb_id);
    var fb_id = user_login_time(data, socket.id); //io.emit('user', user_id)

    console.log(fb_id);
  });
  socket.on('send message', function (data) {
    console.log('message: ' + data.msg);
    console.log('user_name: ' + data.user_name);
    console.log('createTime: ' + data.createTime);
    var message = new _messages.Messages();
    message.msg = data.msg;
    message.user_name = data.user_name;
    message.fb_id = data.fb_id;
    message.createTime = data.createTime;
    message.save(function (err) {
      var successResult = {
        status: true,
        _id: message._id,
        msg: data.msg,
        fb_id: data.fb_id,
        user_name: data.user_name,
        createTime: data.createTime
      };
      var failResult = {
        status: false
      };

      if (err) {
        io.emit('receive message', failResult);
      } else {
        console.log(data.fb_id);
        user_getmessage_time(data.fb_id);
        io.emit('receive message', successResult);
      }
    });
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
app.use('/api', router);
server.listen(PORT);