const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  id: {
    type: Number,
  },
  question_id: {
    type: Number,
  },
  body: {
    type: String,
  },
  date: {
    type: String,
  },
  answerer_name: {
    type: String,
  },
  answerer_email: {
    type: String,
  },
  reported: {
    type: Number,
  },
  helpfulness: {
    type: Number,
  },
  photos: {
    type: Array,
    default: void 0,
  },
});

module.exports = mongoose.model('answerscol', AnswerSchema);
