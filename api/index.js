const express = require("express");
const app = express();
const mongoose = require("./mongoose");
const CronJob = require("cron").CronJob;
const moment = require("moment");

const cronjob = require("./cronjob/index");
const Schedule = require("./cronjob/worker/Schedule");
const Odd = require("./cronjob/worker/Odd");
const Result = require("./cronjob/worker/Result");
const Profile = require("./cronjob/worker/Profile");
const Tips = require("./cronjob/worker/Tips");

const isProd = process.env.production === "true";

app.get("/", (req, res) => {
  res.json({});
});
app.use("/cronjob", cronjob);

app.use((req, res, next) => {
  next();
});

if (isProd) {
  console.log("CRONJOB RUNNING");
  const scheduleJob = new CronJob("0 0 */2 * * *", () => {
    console.log("CRONJOB RUNNING - SCHEDULE - " + moment().format());
    const worker = Schedule();
    worker.init();
  });
  scheduleJob.start();

  const profileJob = new CronJob("0 0 */1 * * *", () => {
    console.log("CRONJOB RUNNING - PROFILE - " + moment().format());
    const worker = Profile();
    worker.init();
  });
  profileJob.start();

  const oddJob = new CronJob("0 */1 * * * *", () => {
    console.log("CRONJOB RUNNING - ODD - " + moment().format());
    const worker = new Odd();
    worker.update();
  });
  oddJob.start();

  const resultJob = new CronJob("0 */30 * * * *", () => {
    console.log("CRONJOB RUNNING - RESULT - " + moment().format());
    const worker = new Result();
    worker.init();
  });
  resultJob.start();

  const tipsJob = new CronJob("0 0 8 * * *", () => {
    console.log("CRONJOB RUNNING - TIPS - " + moment().format());
    const worker = Tips();
    worker.init();
  });
  tipsJob.start();

  const tipsResultJob = new CronJob("0 */60 * * * *", () => {
    console.log("CRONJOB RUNNING - TIPS Result - " + moment().format());
    const worker = Tips();
    worker.initResult();
  });
  tipsResultJob.start();
}

const port = 8083;

app.listen(port, () => console.log("Server running..."));
