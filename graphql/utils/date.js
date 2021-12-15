const moment = require("moment");

const formatDate = ({ datetime, format }) => {
  const date = moment(datetime).utcOffset(480);
  switch (format) {
    case "DEFAULT":
      return datetime;
    case "UNIX":
      return date.valueOf();
    case "FULL_FORMATTED":
      return date.format("YYYY/MM/DD HH:mm");
    case "HH_mm":
      return date.format("HH:mm");
    case "DD_MM":
      return date.format("DD/MM");
    case "DD":
      return date.format("DD");
    default:
      return date;
  }
};

const getWeekdayChin = (day) => {
  return {
    SUN: "週日",
    MON: "週一",
    TUE: "週二",
    WED: "週三",
    THU: "週四",
    FRI: "週五",
    SAT: "週六",
  }[day];
};
module.exports = {
  formatDate,
  getWeekdayChin,
};
