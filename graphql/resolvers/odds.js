const moment = require('moment')

const datetime = (parent, args, context, info) => {
  const { datetime } = parent
  switch (args.format) {
    case 'DEFAULT':
      return datetime
    case 'UNIX':
      return moment(datetime).valueOf()
    case 'FULL_FORMATTED':
      return moment(datetime).format('YYYY/MM/DD HH:mm')
    case 'HH_mm':
      return moment(datetime).format('HH:mm')
    case 'DD_MM':
      return moment(datetime).format('DD/MM')
    default:
      return datetime
  }  
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