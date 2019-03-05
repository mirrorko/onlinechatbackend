"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todolist = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todolistSchema = _mongoose.default.Schema({
  id: String,
  title: String,
  createTime: Number,
  status: String,
  editStatus: String
});

var Todolist = _mongoose.default.model('todoList', todolistSchema);

exports.Todolist = Todolist;