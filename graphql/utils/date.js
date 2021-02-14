const moment = require('moment')

const formatDate = ({ datetime, format }) => {
  switch (format) {
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
  formatDate
}