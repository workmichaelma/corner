const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const moment = require("moment");

const head = require("lodash/head");
const LeagueSchema = require("./League");
const TeamSchema = require("./Team");

const { dbObjectToObject } = require("../../utils/index");

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

MatchSchema.statics.getTeamHistory = async ({
  _id,
  teamId,
  before,
  after,
  limit,
}) => {
  let team_id = _id;
  if (!team_id) {
    if (teamId) {
      const { _id } =
        (await TeamSchema.findOne({
          id: teamId,
          result: {
            $ne: null,
          },
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
        "result.HAD": {
          $ne: "RFD",
        },
        "result.HHA": {
          $ne: null,
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
        .limit(limit)
        .sort({ datetime: -1 })
        .populate(populate)
        .lean() || []
    );
  }
  return [];
};

MatchSchema.statics.getScheduleByDate = async ({ to, from, orderBy }) => {
  const { docs, ...metadata } = await Match.paginate(
    {
      datetime: {
        $gt: new Date(from),
        $lt: new Date(to),
      },
    },
    {
      limit: 1000,
      sort: { datetime: orderBy, num: 1 },
      populate,
    }
  );

  return {
    docs: dbObjectToObject(docs),
    ...metadata,
  };
};

MatchSchema.statics.getSchedule = async ({ page = 1, limit = 10 }) => {
  const { docs, ...metadata } = await Match.paginate(
    {
      datetime: {
        $gt: new Date(),
      },
    },
    {
      page,
      limit,
      sort: { datetime: 1, num: 1 },
      populate,
    }
  );

  return {
    docs: dbObjectToObject(docs),
    ...metadata,
  };
};

MatchSchema.statics.getEndedMatches = async ({ page = 1, limit = 10 }) => {
  const { docs, ...metadata } = await Match.paginate(
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
    }
  );

  return {
    docs: dbObjectToObject(docs),
    ...metadata,
  };
};

module.exports = Match = mongoose.model("match", MatchSchema, "matches");
