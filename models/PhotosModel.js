const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerPhoto = new Schema({
  id: { type: Number },
  answer_id: { type: Number },
  url: { type: String },
});

module.exports = mongoose.model('answersphotocol', AnswerPhoto);
