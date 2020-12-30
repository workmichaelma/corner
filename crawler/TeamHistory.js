const axios = require('axios')
const find = require('lodash/find')
const moment = require('moment')
const { isString, reduce, range, map, isEmpty, get, flatten } = require('lodash')

const { Match } = require('./Schedule')
const { Result } = require('./Result')

class HistoryMatch extends Match {
  constructor(obj) {
    super(obj)
    this.result = new Result(obj)
  }
}

const dateRange = reduce(range(7), (date, v) => {
  const startdate = moment(date.current).subtract({days: 30}).format('YYYYMMDD')
  date.arr.push({
    startdate,
    enddate: moment(date.current).subtract({days: 1}).format('YYYYMMDD'),
  })
  date.current = startdate
  return date
}, {
  current: moment().format('YYYYMMDD'),
  arr: []
})

const getHistoryUrl = (start, end, id) => {
  return `https://bet.hkjc.com/football/getJSON.aspx?jsontype=search_result.aspx&startdate=${start}&enddate=${end}&teamid=${id}`
}

const fetchTeam = async id => {
  const data = await Promise.all(map(dateRange.arr, async r => {
    return fetchJc(getHistoryUrl(r.startdate, r.enddate, id))
  }))

  return reduce(flatten(data), (obj, m) => {
    if (m.id) {
      obj[m.id] = m
    }
    return obj
  }, {})
}

const fetchJc = async url => {
  try {
    return axios.get(url).then(({ data }) => {
      const matches = get(data, '[0]matches', [])
      if (!isEmpty(matches)) {
        return map(matches, m => new HistoryMatch(m))
      }
      return {}
    }).catch(err => {
      console.log('TeamHistory fetchJc error, ', err)
      return {}
    })
  } catch (err) {
    console.log(err)
    return {}
  }
}

module.exports = {
  init: async (ids) => {
    try {
      const teams = await Promise.all(map(ids, async id => {
        return {
          id,
          data: await fetchTeam(id)
        }
      }))
      return reduce(teams, (obj, t) => {
        obj[t.id] = t.data
        return obj
      }, {})
    } catch (err) {
      console.log(err)
      return []
    }
  },
}