"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _mongoose.default.Schema({
  id: String,
  name: String,
  email: String,
  fb_id: String,
  socket_id: String,
  get_message_time: {
    type: Number,
    default: null
  },
  login_time: {
    type: Number,
    default: null
  }
});

var Users = _mongoose.default.model('Users', userSchema);

exports.Users = Users;