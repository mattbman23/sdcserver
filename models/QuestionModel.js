const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question_id: {
    type: Number,
  },
  product_id: {
    type: Number,
  },
  question_body: {
    type: String,
  },
  question_date: {
    type: String,
  },
  asker_name: {
    type: String,
  },
  asker_email: {
    type: String,
  },
  reported: {
    type: Number,
  },
  question_helpful: {
    type: Number,
  },
});

module.exports = Question = mongoose.model('questionscol', QuestionSchema);
