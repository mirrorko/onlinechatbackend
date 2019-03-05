"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineChat = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onlinechatSchema = _mongoose.default.Schema({
  id: String,
  user_id: String,
  user_name: String,
  content: String,
  createTime: Number
});

var OnlineChat = _mongoose.default.model('OnlineChat', onlinechatSchema);

exports.OnlineChat = OnlineChat;