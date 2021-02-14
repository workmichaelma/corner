const { formatDate } = require('../utils/date')

const datetime = (parent, args, context, info) => {
  const { datetime } = parent
  const { format } = args
  return formatDate({ datetime, format })
}

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
}