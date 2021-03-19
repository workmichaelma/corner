const { map } = require("lodash");

module.exports = {
  dbObjectToObject: (obj) => {
    try {
      return map(obj, (d) => d.toObject());
    } catch (err) {
      console.log("dbObjectToObject error: ", obj);
      return [];
    }
  },
};
