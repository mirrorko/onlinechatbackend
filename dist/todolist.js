"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Todolist = require('./models/todolist');

var SocketHander =
/*#__PURE__*/
function () {
  function SocketHander() {
    _classCallCheck(this, SocketHander);

    this.db;
  }

  _createClass(SocketHander, [{
    key: "connect",
    value: function connect() {
      this.db = require('mongoose').connect('mongodb://localhost:27017');
      this.db.Promise = global.Promise;
      return this;
    }
  }, {
    key: "getTodolists",
    value: function getTodolists() {
      return Todolist.find();
    }
  }, {
    key: "storeTodolists",
    value: function storeTodolists(data, res) {
      console.log(data);
      var newTodolist = new Todolist({
        id: data.id,
        title: data.title,
        createTime: data.createTime,
        status: data.status
      });
      var doc = newTodolist.save(function (err) {
        if (err) res.send(err);
        res.json({
          message: 'Todoitem created!'
        });
      });
    }
  }]);

  return SocketHander;
}();

module.exports = SocketHander;