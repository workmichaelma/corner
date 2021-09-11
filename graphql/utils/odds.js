const {
  get,
  head,
  last,
  reverse,
  isEmpty,
  isArray,
  take,
  reduce,
} = require("lodash");

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

const FakeHDC = {
  1: "-X",
  1.03: "-2.5/-3.0",
  1.065: "-2.0/-2.5",
  1.085: "-2.0",
  1.135: "-1.5/-2.0",
  1.24: "-1.0/-1.5",
  1.36: "-1.0",
  1.51: "-0.5/-1.0",
  1.8: "+0.0/-0.5",
  2.2: "+0.0",
  2.8: "+0.0/+0.5",
  3.8: "+0.5/+1.0",
  5.1: "+1.0",
  6.6: "+1.0/+1.5",
  9.3: "+1.5/+2.0",
  13.7: "+2.0",
  18: "+2.0/+2.5",
  32: "+2.5/+3.0",
  45: "+X",
};

const getFakeHDC = (v, isFake) => {
  let result = v;
  if (isFake && v) {
    result = reduce(
      FakeHDC,
      (result, s, k) => {
        if (parseFloat(v) > k) {
          result = s;
        }
        return result;
      },
      null
    );
  }
  return {
    isFake,
    value: getChinHDC(result),
  };
};

const chinHDCMap = {
  "-X": "讓好多球",
  "-2.5/-3.0": "兩球半/三",
  "-2.0/-2.5": "兩/兩球半",
  "-2.0": "兩球",
  "-1.5/-2.0": "一球半/兩",
  "-1.0/-1.5": "一/一球半",
  "-1.0": "一球",
  "-0.5/-1.0": "半/一",
  "+0.0/-0.5": "平/半",
  "+0.0": "平手",
  "+0.0/+0.5": "-平/半",
  "+0.5/+1.0": "-半/一",
  "+1.0": "-一球",
  "+1.0/+1.5": "-一/一球半",
  "+1.5/+2.0": "-一球半/兩",
  "+2.0": "-兩球",
  "+2.0/+2.5": "-兩/兩球半",
  "+2.5/+3.0": "-兩球半/三",
  "+X": "受讓好多球",
};

const getChinHDC = (v) => {
  console.log(v, get(chinHDCMap, v, null));
  return get(chinHDCMap, v, null);
};

module.exports = {
  filterOdds,
  prettyHDCLine,
  getFakeHDC,
};
