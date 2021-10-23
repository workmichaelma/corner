const express = require("express");
const app = express();

const isString = require("lodash/isString");
const Schedule = require("./Schedule");
const Result = require("./Result");
const Team = require("./Team");
const Match = require("./Match");

app.get("/schedule", async (req, res) => {
  try {
    res.json(await Schedule.init());
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/result", async (req, res) => {
  try {
    const { ids: _ids } = req.query;
    if (isString(_ids)) {
      const ids = _ids.split(",");
      res.json(await Result.init(ids));
    } else {
      res.json({});
    }
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/team", async (req, res) => {
  try {
    const { ids: _ids } = req.query;
    if (isString(_ids)) {
      const ids = _ids.split(",");
      res.json(await Team.init(ids));
    } else {
      res.json({});
    }
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/match", async (req, res) => {
  try {
    const { id } = req.query;
    if (isString(id)) {
      res.json(await Match.init(id));
    } else {
      res.json({});
    }
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

module.exports = app;
