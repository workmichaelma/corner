const mongoose = require("mongoose");
const reduce = require("lodash/reduce");
const updateAt = require("mongoose-createdat-updatedat");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  winId: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

TeamSchema.statics.find_Update_Insert = async (_team) => {
  try {
    const team =
      reduce(
        _team,
        (obj, v, k) => {
          if (v) {
            obj[k] = v;
          }
          return obj;
        },
        {}
      ) || {};
    if (team.id || team.winId) {
      return await Team.findOneAndUpdate(
        {
          ...(team.id
            ? {
                id: team.id,
              }
            : {
                winId: team.winId,
              }),
        },
        team,
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.log("TeamSchema.statics.find_Update_Insert() error: ", err);
    return {};
  }
};

TeamSchema.statics.findTeamByName = async (name) => {
  try {
    return Team.findOne({
      name,
    });
  } catch (err) {
    return null;
  }
};

TeamSchema.statics.findTeamByWinId = async (winId) => {
  try {
    return Team.findOne({
      winId,
    });
  } catch (err) {
    return null;
  }
};

TeamSchema.statics.findTeamByObjectId = async (_id) => {
  try {
    return Team.findOne({
      _id,
    });
  } catch (err) {
    return null;
  }
};

TeamSchema.statics.insertTeam = async ({ name, id }) => {
  try {
    return Team.create({
      id,
      name,
    });
  } catch (err) {
    console.log("TeamSchema.statics.insertTeam() error");
    return {};
  }
};

TeamSchema.statics.updateTeam = async ({ _id }, args) => {
  try {
    return Team.findOneAndUpdate(
      {
        _id,
      },
      args,
      {
        new: true,
      }
    );
  } catch (err) {
    console.log("TeamSchema.statics.updateTeam() error");
    return {};
  }
};

TeamSchema.plugin(updateAt);

module.exports = Team = mongoose.model("team", TeamSchema, "teams");
