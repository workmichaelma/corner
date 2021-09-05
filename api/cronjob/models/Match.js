const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const updateAt = require("mongoose-createdat-updatedat");
const { isEmpty, get, reduce, isObject } = require("lodash");
const Result = require("./Result");
const Team = require("./Team");
const League = require("./League");
// const Update = require('./update')

const MatchSchema = new Schema({
  id: String,
  num: String,
  day: String,
  datetime: Date,
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  away: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  homeRank: String,
  awayRank: String,
  winId: String,
  result: Result,
  updatedHistory: {
    type: Boolean,
    default: false,
  },
  odds: {
    chl: [
      {
        datetime: Date,
        H: String,
        L: String,
        LINE: String,
      },
    ],
    had: [
      {
        datetime: Date,
        H: String,
        A: String,
        D: String,
      },
    ],
    fha: [
      {
        datetime: Date,
        H: String,
        A: String,
        D: String,
      },
    ],
    hha: [
      {
        datetime: Date,
        H: String,
        D: String,
        A: String,
        HG: String,
        AG: String,
      },
    ],
    hil: [
      {
        datetime: Date,
        H: String,
        L: String,
        LINE: String,
      },
    ],
    fhl: [
      {
        datetime: Date,
        H: String,
        L: String,
        LINE: String,
      },
    ],
    hdc: [
      {
        datetime: Date,
        H: String,
        A: String,
        HG: String,
        AG: String,
      },
    ],
  },
});

MatchSchema.pre("validate", function (next) {
  try {
    if (isObject(this.result)) {
      this.result = this.result.buildResult(this.result);
    }
    next();
  } catch (err) {
    console.error("MatchSchema.pre.validate() error: ", { match: this, err });
    next(err);
  }
});

MatchSchema.statics.find_Update_Insert = async (_match) => {
  try {
    const match =
      reduce(
        _match,
        (obj, v, k) => {
          if (v) {
            obj[k] = v;
          }
          return obj;
        },
        {}
      ) || {};
    return new Promise((resolve, reject) => {
      const obj = new Match(match);
      obj.validate(function (err) {
        if (err) {
          console.error("MatchSchema.statics.find_Update_Insert() error:", {
            doc: obj._doc,
            err,
          });
          resolve({});
        }
        const doc = {
          ...obj._doc,
          _id: undefined,
        };
        delete doc._id;
        if (doc.id || doc.winId) {
          resolve(
            Match.findOneAndUpdate(
              {
                ...(match.id
                  ? {
                      id: match.id,
                    }
                  : {
                      winId: match.winId,
                    }),
              },
              doc,
              { upsert: true, new: true }
            )
          );
        }
        resolve({});
      });
    })
      .then((m) => m)
      .catch((err) => {
        console.error("MatchSchema.statics.find_Update_Insert() error: ", {
          _match,
          err,
        });
      });
  } catch (err) {
    console.error("MatchSchema.statics.find_Update_Insert() error: ", {
      _match,
      err,
    });
    return {};
  }
};

MatchSchema.statics.updateResult = async (result) => {
  try {
    return Match.findOneAndUpdate(
      {
        id: result.id,
      },
      {
        result,
      },
      { new: true }
    );
  } catch (err) {
    console.error("MatchSchema.statics.updateResult() error: ", {
      result,
      err,
    });
  }
};

MatchSchema.statics.insertOdds = async ({ id, odds }) => {
  try {
    return Match.findOneAndUpdate(
      {
        id,
      },
      {
        $push: odds,
      },
      { new: true }
    );
  } catch (err) {
    console.error("MatchSchema.statics.insertOdds() error: ", { result, err });
  }
};

MatchSchema.statics.getFutureMatchesWithLatestOdd = async () => {
  try {
    return Match.aggregate([
      {
        $match: {
          datetime: {
            $gt: new Date(moment()),
          },
        },
      },
      {
        $project: {
          id: "$id",
          chl: {
            $arrayElemAt: ["$odds.chl", -1],
          },
          had: {
            $arrayElemAt: ["$odds.had", -1],
          },
          hha: {
            $arrayElemAt: ["$odds.hha", -1],
          },
          fha: {
            $arrayElemAt: ["$odds.fha", -1],
          },
          hil: {
            $arrayElemAt: ["$odds.hil", -1],
          },
          fhl: {
            $arrayElemAt: ["$odds.fhl", -1],
          },
          hdc: {
            $arrayElemAt: ["$odds.hdc", -1],
          },
        },
      },
    ]);
  } catch (err) {
    return [];
  }
};

MatchSchema.statics.getFutureMatches = async () => {
  try {
    return Match.find({
      datetime: {
        $gte: new Date(),
      },
    });
  } catch (err) {
    console.error(err);
    return [];
  }
};

MatchSchema.statics.getMatchesWithDateRange = async ({
  start: _start,
  end: _end = moment(),
  odds = false,
  result,
  limit = 100,
}) => {
  try {
    const start = moment(_start);
    const end = moment(_end);

    if (start.isValid() && end.isValid()) {
      return Match.find({
        datetime: {
          $gte: start.format(),
          $lt: end.format(),
        },
        ...(isBoolean(result)
          ? {
              result: {
                $exist: result,
              },
            }
          : {}),
      })
        .limit(limit)
        .lean();
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

MatchSchema.statics.getNoResultMatchesWithDateRange = async ({
  start: _start,
  end: _end = moment(),
  limit = 100,
}) => {
  try {
    const start = moment(_start);
    const end = moment(_end);

    if (start.isValid() && end.isValid()) {
      return Match.find({
        datetime: {
          $gte: start.format(),
          $lt: end.format(),
        },
        result: {
          $exists: false,
        },
      })
        .limit(limit)
        .sort({ datetime: 1 })
        .lean();
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

MatchSchema.statics.saveMatchWithWin = async ({ jc, win, result }) => {
  try {
    const winValid = !isEmpty(win) && get(win, "winId");
    const { winLeagueId, winId, winHomeTeam, winAwayTeam } = win || {};
    const {
      id: winHomeId,
      rank: homeRank = "",
      homeImage = "",
    } = winHomeTeam || {};
    const {
      id: winAwayId,
      rank: awayRank = "",
      awayImage = "",
    } = winAwayTeam || {};

    const { _id: league_id } = await League.find_Update_Insert({
      id: jc.league.id,
      name: jc.league.name,
      ...(winValid && winLeagueId
        ? {
            winId: winLeagueId,
          }
        : {}),
    });

    const { _id: home_id } = await Team.find_Update_Insert({
      id: jc.home.id,
      name: jc.home.name,
      ...(winValid && winHomeId
        ? {
            winId: winHomeId,
            image: homeImage,
          }
        : {}),
    });

    const { _id: away_id } = await Team.find_Update_Insert({
      id: jc.away.id,
      name: jc.away.name,
      ...(winValid && winAwayId
        ? {
            winId: winAwayId,
            image: awayImage,
          }
        : {}),
    });

    return Match.find_Update_Insert({
      ...jc,
      homeRank,
      awayRank,
      league: league_id,
      home: home_id,
      away: away_id,
      datetime: moment(jc.datetime).toDate(),
      ...(winValid
        ? {
            winId,
          }
        : {}),
      ...(result
        ? {
            result,
          }
        : {}),
    });
  } catch (err) {
    console.error("MatchSchema.statics.saveMatchWithWin() error: ", {
      jc,
      win,
      result,
      err,
    });
    return {};
  }
};

MatchSchema.statics.saveMatch = async (match) => {
  try {
    const { _id } = (await Match.findOne(match)) || {};
    if (_id) {
      return _id;
    } else if (match.id) {
      return Match.create(match);
    }
  } catch (err) {
    console.error("MatchSchema.statics.saveMatch() error", err);
    return {};
  }
};

MatchSchema.statics.updateMatchWinProfile = async ({
  _id,
  winId,
  homeRank,
  awayRank,
}) => {
  try {
    return Match.findOneAndUpdate(
      {
        _id,
      },
      {
        ...(winId
          ? {
              winId,
            }
          : {}),
        ...(homeRank
          ? {
              homeRank,
            }
          : {}),
        ...(awayRank
          ? {
              awayRank,
            }
          : {}),
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.error("MatchSchema.statics.saveMatch() error", err);
    return;
  }
};

MatchSchema.plugin(updateAt);

module.exports = Match = mongoose.model("match", MatchSchema);
