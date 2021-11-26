const mongoose = require("mongoose");
// mongoose
//   .connect(`mongodb://mongo:27017/corner`, { useNewUrlParser: true })
mongoose
  .connect(
    `mongodb+srv://workmichaelma:footballwork@corner.mmzia.mongodb.net/corner?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
