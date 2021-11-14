const express = require("express");
const app = express();
const mongoose = require("./mongoose");
const CronJob = require("cron").CronJob;

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
    console.log("CRONJOB RUNNING - SCHEDULE");
    const worker = Schedule();
    worker.init();
  });
  scheduleJob.start();

  const profileJob = new CronJob("0 0 */1 * * *", () => {
    console.log("CRONJOB RUNNING - PROFILE");
    const worker = Profile();
    worker.init();
  });
  profileJob.start();

  const oddJob = new CronJob("0 */1 * * * *", () => {
    console.log("CRONJOB RUNNING - ODD");
    const worker = new Odd();
    worker.update();
  });
  oddJob.start();

  const resultJob = new CronJob("0 */30 * * * *", () => {
    console.log("CRONJOB RUNNING - RESULT");
    const worker = new Result();
    worker.init();
  });
  resultJob.start();

  const tipsJob = new CronJob("0 8 * * * *", () => {
    console.log("CRONJOB RUNNING - TIPS");
    const worker = Tips();
    worker.init();
  });
  tipsJob.start();
}

const port = 8083;

app.listen(port, () => console.log("Server running..."));
