const express = require("express");
const app = express();
const mongoose = require("./mongoose");
const CronJob = require("cron").CronJob;

const cronjob = require("./cronjob/index");
const Schedule = require("./cronjob/worker/Schedule");
const Odd = require("./cronjob/worker/Odd");
const Result = require("./cronjob/worker/Result");
const Profile = require("./cronjob/worker/Profile");

app.get("/", (req, res) => {
  res.json({});
});
app.use("/cronjob", cronjob);

app.use((req, res, next) => {
  next();
});

const scheduleJob = new CronJob("0 0 */2 * * *", () => {
  const worker = new Schedule();
  worker.init();
});
scheduleJob.start();

const profileJob = new CronJob("0 0 */1 * * *", () => {
  const worker = Profile();
  worker.init();
});
profileJob.start();

const oddJob = new CronJob("0 */1 * * * *", () => {
  const worker = new Odd();
  worker.update();
});
oddJob.start();

const resultJob = new CronJob("0 */120 * * * *", () => {
  const worker = new Result();
  worker.init();
});
resultJob.start();

const port = 8083;

app.listen(port, () => console.log("Server running..."));
