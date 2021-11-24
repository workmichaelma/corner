const { range } = require("lodash");
const mongoose = require("mongoose");
const updateAt = require("mongoose-createdat-updatedat");
const { map } = require("lodash");
const moment = require("moment");
const Schema = mongoose.Schema;

const MatchSchema = require("./Match");

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
  betLine: {
    type: String,
    required: false,
  },
  result: String,
  gainLost: Number,
  betItemResult: String,
});

TipsSchema.virtual("match", {
  ref: "Match",
  localField: "matchId",
  foreignField: "id",
});

TipsSchema.statics.getNoResultTips = async () => {
  try {
    return Tips.find({
      result: null,
      date: {
        $in: map(range(20), (i) => {
          return moment().subtract(i, "days").format("YYYY-MM-DD");
        }),
      },
    })
      .populate({
        path: "match",
        model: MatchSchema,
        select: "result",
      })
      .lean();
  } catch (err) {
    console.log(`getNoResultTips - error, ${err}`);
    return [];
  }
};

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

TipsSchema.statics.insertTipsResult = async ({
  _id,
  result,
  gainLost,
  betItemResult,
}) => {
  const Tips = mongoose.model("Tips", TipsSchema);
  try {
    return Tips.findOneAndUpdate(
      {
        _id,
      },
      {
        result,
        gainLost,
        betItemResult,
      },
      { new: true }
    );
  } catch (err) {
    console.error("TipsSchema.statics.insertTipsResult() error: ", {
      result,
      err,
    });
  }
};

TipsSchema.plugin(updateAt);

module.exports = Tips = mongoose.model("tips", TipsSchema, "tips");
