const {
  get,
  head,
  last,
  reverse,
  isEmpty,
  isArray,
  take,
  reduce,
  map,
  isUndefined,
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

const getFakeHDC = (v, isFake, result) => {
  let line = v;
  let _result = "";
  if (!isFake && !isEmpty(result)) {
    _result = get(result, "HDC.first", "");
  }
  if (isFake && v) {
    line = reduce(
      FakeHDC,
      (line, s, k) => {
        if (parseFloat(v) > k) {
          line = s;
        }
        return line;
      },
      null
    );
  }
  if ((isFake && !isEmpty(result)) || (_result === null && !isEmpty(result))) {
    _result = getHDCResult({
      odd: line || "",
      home: get(result, "FT.home", -1),
      away: get(result, "FT.away", -1),
    });
  }
  return {
    isFake,
    value: getChinHDC(line),
    result: _result,
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
  "+0.0/+0.5": "受平/半",
  "+0.5/+1.0": "受半/一",
  "+1.0": "受一球",
  "+1.0/+1.5": "受一/一球半",
  "+1.5/+2.0": "受一球半/兩",
  "+2.0": "受兩球",
  "+2.0/+2.5": "受兩/兩球半",
  "+2.5/+3.0": "受兩球半/三",
  "+X": "受讓好多球",
};

const getChinHDC = (v) => {
  return get(chinHDCMap, v, null);
};

const getHHAResult = ({ LINE, home, away }) => {
  if (LINE < 0) {
    const diff = home - away + LINE;
    return diff === 0 ? "D" : diff > 0 ? "H" : diff < 0 ? "A" : null;
  } else if (LINE > 0) {
    const diff = away - home + LINE;
    return diff === 0 ? "D" : diff > 0 ? "A" : diff < 0 ? "H" : null;
  } else if (LINE === 0) {
    const diff = home - away;
    return diff === 0 ? "D" : diff > 0 ? "H" : diff < 0 ? "A" : null;
  }
  return null;
};

const getHDCResult = ({ odd, home, away }) => {
  let [LINE1, LINE2] = map(odd.split("/"), parseFloat);
  if (!isUndefined(LINE1) && isUndefined(LINE2) && !isNaN(LINE1)) {
    if (LINE1 < 0) {
      const diff = home - away + ~~LINE1;
      return diff === 0 ? "D" : diff > 0 ? "H" : diff < 0 ? "A" : null;
    }
    // 客讓
    else if (LINE1 > 0) {
      const diff = away - home + ~~LINE1;
      return diff === 0 ? "D" : diff > 0 ? "A" : diff < 0 ? "H" : null;
    }
    // 平手
    else {
      const diff = home - away;
      return diff === 0 ? "D" : diff > 0 ? "H" : diff < 0 ? "A" : null;
    }
  } else if (
    !isUndefined(LINE1) &&
    !isUndefined(LINE2) &&
    !isNaN(LINE1) &&
    !isNaN(LINE2)
  ) {
    const result = [
      getHHAResult({ LINE: LINE1, home, away }),
      getHHAResult({ LINE: LINE2, home, away }),
    ].join("");
    switch (result) {
      case "HH":
        return "H";
      case "AA":
        return "A";
      case "DA":
        return "AF";
      case "DH":
        return "HF";
      case "HD":
        return "HF";
      case "AD":
        return "AF";
      default:
        return null;
    }
  }
};

module.exports = {
  filterOdds,
  prettyHDCLine,
  getFakeHDC,
};
