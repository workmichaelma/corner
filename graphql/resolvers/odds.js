const { isEmpty, get } = require("lodash");
const { formatDate } = require("../utils/date");
const { prettyHDCLine, getFakeHDC } = require("../utils/odds");

const datetime = (parent, args, context, info) => {
  const { datetime } = parent;
  const { format } = args;
  return formatDate({ datetime, format });
};

module.exports = {
  Odds: {
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
    FAKE_HDC: (parent, args, context, info) => {
      const { HAD, HDC, result } = parent;
      const isFake = isEmpty(HDC);
      const [had = {}, ...r] = HAD;
      if (isEmpty(had)) {
        return {};
      }
      return getFakeHDC(
        isFake ? had.H : get(HDC, "[0].HG", null),
        isFake,
        result
      );
    },
  },
};
