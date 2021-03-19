const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const moment = require("moment");

const head = require("lodash/head");
const LeagueSchema = require("./League");
const TeamSchema = require("./Team");

const populate = [
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
];

const MatchSchema = new Schema({
  id: String,
  matchTime: Date,
});

MatchSchema.plugin(mongoosePaginate);

MatchSchema.statics.get = async ({ id, winId }) => {
  return Match.findOne({
    id,
  })
    .populate(populate)
    .lean();
};

MatchSchema.statics.getTeamHistory = async ({ _id, teamId, before, after }) => {
  let team_id = _id;
  if (!team_id) {
    if (teamId) {
      const { _id } =
        (await TeamSchema.findOne({
          id: teamId,
        })) || {};
      if (_id) {
        team_id = _id;
      }
    }
  }
  if (team_id) {
    return (
      Match.find({
        datetime: {
          $lt: before ? new Date(before) : new Date(),
          ...(after
            ? {
                $gt: new Date(after),
              }
            : {}),
        },
        $or: [
          {
            home: team_id,
          },
          {
            away: team_id,
          },
        ],
      })
        .sort({ datetime: -1 })
        .populate(populate)
        .lean() || []
    );
  }
  return [];
};

MatchSchema.statics.getSchedule = async ({ page = 1, limit = 10 }) => {
  return Match.paginate(
    {
      datetime: {
        $gte: new Date(),
      },
    },
    {
      page,
      limit,
      sort: { datetime: 1, num: 1 },
      populate,
      lean: true,
    }
  );
};

MatchSchema.statics.getEndedMatches = async ({ page = 1, limit = 10 }) => {
  return Match.paginate(
    {
      datetime: {
        $lt: new Date(),
      },
    },
    {
      page,
      limit,
      sort: { datetime: -1, num: 1 },
      populate,
      lean: true,
    }
  );
};

module.exports = Match = mongoose.model("match", MatchSchema, "matches");
