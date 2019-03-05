"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messagesSchema = _mongoose.default.Schema({
  id: String,
  user_id: String,
  user_name: String,
  fb_id: String,
  msg: String,
  createTime: Number
});

var Messages = _mongoose.default.model('Messages', messagesSchema);

exports.Messages = Messages;