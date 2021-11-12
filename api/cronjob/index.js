const express = require("express");
const app = express();

const Odd = require("./worker/Odd");
const Schedule = require("./worker/Schedule");
const Result = require("./worker/Result");
const TeamHistory = require("./worker/TeamHistory");
const Tips = require("./worker/Tips");
const Profile = require("./worker/Profile");

app.get("/odd", async (req, res) => {
  try {
    const worker = new Odd();
    res.json(await worker.update());
  } catch (err) {
    console.log(err);
    res.status(404).json({});
  }
});

app.get("/schedule", async (req, res) => {
  try {
    const worker = Schedule();
    res.json(await worker.init());
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/result", async (req, res) => {
  try {
    const worker = new Result();
    res.json(await worker.init());
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/team-history", async (req, res) => {
  try {
    const worker = new TeamHistory();
    res.json(await worker.init());
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/profile", async (req, res) => {
  try {
    const worker = Profile();
    res.json(await worker.init());
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.get("/tips", async (req, res) => {
  try {
    const worker = Tips();
    res.json(await worker.init());
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

module.exports = app;
