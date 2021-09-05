const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  id: String,
  name: String,
  winId: String,
});

LeagueSchema.statics.find_Update_Insert = async (league) => {
  try {
    return await League.findOneAndUpdate(
      {
        id: league.id,
      },
      league,
      { upsert: true, new: true }
    );
  } catch (err) {
    return {};
  }
};

LeagueSchema.statics.findLeagueByName = async (name) => {
  try {
    return League.findOne({
      name,
    });
  } catch (err) {
    return null;
  }
};

LeagueSchema.statics.findLeagueByObjectId = async (_id) => {
  try {
    return League.findOne({
      _id,
    });
  } catch (err) {
    return null;
  }
};

LeagueSchema.statics.insertLeague = async ({ name, id }) => {
  try {
    return League.create({
      id,
      name,
    });
  } catch (err) {
    console.log("LeagueSchema.statics.insertLeague() error");
    return {};
  }
};

module.exports = League = mongoose.model("league", LeagueSchema);
