const { head, last, reverse, isEmpty, isArray, take } = require("lodash")

const filterByOrder = ({ _odds, orderBy }) => {
  switch (orderBy) {
    case 'DESC':
      return reverse(_odds);
    case 'ASC':
      return _odds
    default:
      return _odds
  }
}

const filterByType = ({ _odds, type }) => {
  switch (type) {
    case 'FULL':
      return _odds;
    case 'FIRST_LATEST':
      return [head(_odds), last(_odds)];
    case 'FIRST':
      return [head(_odds)];
    case 'LATEST':
      return [last(_odds)];
    default:
      return _odds;
  }
}

const filterOdds = ({ odds, args }) => {
  if (isArray(odds) && !isEmpty(odds)) {
    const { type, orderBy, limit } = args
    console.log({args})
    let _odds = odds || []
    if (type) {
      _odds = filterByType({ _odds, type })
      if (type === 'FULL') {
        _odds = filterByOrder({ _odds, orderBy })
        if (limit) {
          _odds = take(_odds, limit)
        }
      }
    } else {
      _odds = filterByOrder({ _odds, orderBy })
      if (limit) {
        _odds = take(_odds, limit)
      }
    }
    return _odds
  }
  return []
}

module.exports = {
  filterOdds
}