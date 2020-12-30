const mongoose = require('mongoose');
mongoose.connect(`mongodb://mongo:27017/corner`,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  module.exports = mongoose