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
    return Tips.create(tips, function (err) {
      if (err) return handleError(err);
      // saved!
    });
  } catch (err) {
    return null;
  }
};
module.exports = Team = mongoose.model("tips", TipsSchema, "tips");
