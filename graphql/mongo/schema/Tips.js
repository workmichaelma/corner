const { isUndefined } = require("lodash");
const mongoose = require("mongoose");
const MatchSchema = require("./Match");
const TeamSchema = require("./Team");
const LeagueSchema = require("./League");
const Schema = mongoose.Schema;

const TipsSchema = new Schema({
  date: String,
  matchId: {
    type: Schema.Types.ObjectId,
  },
  betType: String,
  betItem: String,
  betOdd: String,
  betGrade: String,
});

TipsSchema.virtual("match", {
  ref: "Match",
  localField: "matchId",
  foreignField: "id",
});

TipsSchema.statics.getTips = async ({ dates }) => {
  const tips = await Tips.find({
    date: {
      $in: dates,
    },
  })
    .populate({
      path: "match",
      model: MatchSchema,
      populate: [
        {
          path: "home",
          model: TeamSchema,
        },
        {
          path: "away",
          model: TeamSchema,
        },
        {
          path: "league",
          model: LeagueSchema,
        },
      ],
    })
    .lean()
    .sort({ date: -1, betGrade: 1 });

  return tips;
};

module.exports = Tips = mongoose.model("tips", TipsSchema, "tips");
