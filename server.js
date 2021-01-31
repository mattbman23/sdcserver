const dbConn = require('./database/config');
const express = require('express');
const app = express();

dbConn();

// declare route
const questionAnswerRoute = require('./routes/questionAnswer');

app.use(express.json());
app.use('/qa', questionAnswerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
