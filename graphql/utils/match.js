const { get } = require("lodash");

const matchResultPreprocess = (result) => {
  if (result) {
    const { corner } = result || {};
    if (corner && get(corner, "half", null) === null) {
      return {
        ...result,
        corner: {
          full: {
            total: get(corner, "full.total", null),
            home: -1,
            away: -1,
          },
          half: {
            total: -1,
            home: -1,
            away: -1,
          },
        },
      };
    }
    return result;
  }
};

module.exports = { matchResultPreprocess };
