const { head, last, reverse, isEmpty, isArray, take } = require("lodash");

const filterByOrder = ({ _odds, orderBy }) => {
  switch (orderBy) {
    case "DESC":
      return reverse(_odds);
    case "ASC":
      return _odds;
    default:
      return _odds;
  }
};

const filterByType = ({ _odds, type }) => {
  switch (type) {
    case "FULL":
      return _odds;
    case "FIRST_LATEST":
      return [head(_odds), last(_odds)];
    case "FIRST":
      return [head(_odds)];
    case "LATEST":
      return [last(_odds)];
    default:
      return _odds;
  }
};

const filterOdds = ({ odds, args }) => {
  if (isArray(odds) && !isEmpty(odds)) {
    const { type, orderBy, limit } = args;
    let _odds = odds || [];
    if (type) {
      _odds = filterByType({ _odds, type });
      if (type === "FULL") {
        _odds = filterByOrder({ _odds, orderBy });
        if (limit) {
          _odds = take(_odds, limit);
        }
      }
    } else {
      _odds = filterByOrder({ _odds, orderBy });
      if (limit) {
        _odds = take(_odds, limit);
      }
    }
    return _odds;
  }
  return [];
};

const prettyHDCLine = (line) => {
  const hasSlash = line.indexOf("/") > -1;
  if (!hasSlash) {
    const [sign, ...r] = line;
    const _r = r.join("");
    const lineInt = parseInt(_r);
    const isInt = _r > lineInt === false && _r < lineInt === false;
    return `${!isInt || lineInt !== 0 ? sign : ""}${isInt ? lineInt : _r}`;
  }
  const [_1, _2] = line.split("/");
  return `${prettyHDCLine(_1)}/${prettyHDCLine(_2)}`;
};

module.exports = {
  filterOdds,
  prettyHDCLine,
};
