const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TipsSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  betType: {
    type: String,
    required: true,
  },
  betItem: {
    type: String,
    required: true,
  },
  betOdd: {
    type: String,
    required: true,
  },
  betGrade: {
    type: String,
    required: true,
  },
});

TipsSchema.statics.insertTips = async (tips) => {
  try {
    const Tips = mongoose.model("Tips", TipsSchema);

    return new Promise((resolve, reject) => {
      Tips.create(tips, function (err, obj) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // saved!
          resolve(obj);
        }
      });
    })
      .then((obj) => obj)
      .catch((err) => err);
  } catch (err) {
    console.log({ err });
    return null;
  }
};
module.exports = Team = mongoose.model("tips", TipsSchema, "tips");