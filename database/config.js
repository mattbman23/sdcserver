const mongoose = require('mongoose');

const dbConn = async () => {
  try {
    await mongoose.connect('mongodb://sdcdb:27017/sdcdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConn;
