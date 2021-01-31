const Question = require('../models/QuestionModel');
const Answer = require('../models/AnswerModel');
const router = require('express').Router();

// find Question&Answers by productID
router.get('/:id', async (req, res) => {
  try {
    const questions = await Question.find({
      product_id: req.params.id,
    }).limit(5);

    const questionAnswer = await Promise.all(
      questions.map(async (qa) => {
        const answerArr = await Answer.find({
          question_id: parseInt(qa.question_id),
        });

        let answerObj = answerArr.map((i) => ({ [i.id]: i }));
        let answers = Object.assign({}, ...answerObj);

        return { ...qa._doc, answers };
      })
    );

    res.json({ product_id: req.params.id, results: questionAnswer });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// find Answers by QuestionID
router.get('/:questionID/answers', async (req, res) => {
  try {
    const chosenAnswers = await Answer.find({
      question_id: parseInt(req.params.questionID),
    }).limit(5);

    res.json({
      question: req.params.questionID,
      page: 0,
      count: chosenAnswers.length,
      results: chosenAnswers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Mark Question as helpful
router.put('/question/:questionId/helpful', async (req, res) => {
  Question.findOne({ question_id: req.params.questionId })
    .then((ques) => {
      if (!ques) {
        return Promise.reject('Question not found');
      }

      ques.question_helpful += 1;
      return ques.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(404).json({ err }));
});

// Report Question
router.put('/question/:questionId/report', async (req, res) => {
  Question.findOne({ question_id: req.params.questionId })
    .then((ques) => {
      if (!ques) {
        return Promise.reject('Question not found');
      }

      ques.reported += 1;
      return ques.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(404).json({ err }));
});

// Mark Answer as helpful
router.put('/answer/:answerID/helpful', async (req, res) => {
  Answer.findOne({ id: req.params.answerID })
    .then((ans) => {
      if (!ans) {
        return Promise.reject('Answer not found');
      }

      ans.helpfulness += 1;
      return ans.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(404).json({ err }));
});

// Report Answer
router.put('/answer/:answerID/report', async (req, res) => {
  Answer.findOne({ id: req.params.answerID })
    .then((ans) => {
      if (!ans) {
        return Promise.reject('Answer not found');
      }

      ans.reported += 1;
      return ans.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(404).json({ err }));
});

// Post Question
router.post('/:productID', async (req, res) => {
  try {
    const { body, name, email } = req.body;

    const lastInsertedItem = await Question.find().sort({ _id: -1 }).limit(1);

    const newQuestion = new Question({
      question_id: lastInsertedItem[0].question_id + 1,
      product_id: req.params.productID,
      question_body: body,
      question_date: new Date().toISOString().split('T')[0],
      asker_name: name,
      asker_email: email,
      reported: 0,
      question_helpful: 0,
    });

    const createdQuestion = await newQuestion.save();
    res.json(createdQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post Answer
router.post('/:questionID/answers', async (req, res) => {
  try {
    const { body, name, email, photos } = req.body;
    const lastInsertedItem = await Answer.find().sort({ _id: -1 }).limit(1);

    const newAnswer = new Answer({
      id: lastInsertedItem[0].id + 1,
      question_id: req.params.questionID,
      body,
      date: new Date().toISOString().split('T')[0],
      answerer_name: name,
      answerer_email: email,
      reported: 0,
      helpfulness: 0,
      photos,
    });

    const createdAnswer = await newAnswer.save();
    res.json(createdAnswer);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/test/getLastQue', async (req, res) => {
  try {
    const lastQue = await Question.find().sort({ _id: -1 }).limit(1);

    res.json(lastQue);
  } catch (error) {
    res.status(404).json({ msg: error + ' lol' });
  }
});

router.get('/test/getLastAns', async (req, res) => {
  try {
    const lastAns = await Answer.find().sort({ _id: -1 }).limit(1);

    res.json(lastAns);
  } catch (error) {
    res.status(404).json({ msg: error + ' lol' });
  }
});

module.exports = router;
