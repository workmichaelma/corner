const { formatDate } = require("../utils/date");
const { prettyHDCLine } = require("../utils/odds");

const datetime = (parent, args, context, info) => {
  const { datetime } = parent;
  const { format } = args;
  return formatDate({ datetime, format });
};

module.exports = {
  HAD: {
    datetime,
  },
  FHA: {
    datetime,
  },
  HHA: {
    datetime,
  },
  HDC: {
    datetime,
    HG: (parent, args, context, info) => {
      return parent.HG ? prettyHDCLine(parent.HG) : undefined;
    },
  },
  HIL: {
    datetime,
  },
  FHL: {
    datetime,
  },
  CHL: {
    datetime,
  },
};
