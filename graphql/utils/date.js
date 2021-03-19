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
    default:
      return date;
  }
};
module.exports = {
  formatDate,
};
