const axios = require('axios')
const find = require('lodash/find')
const get = require('lodash/get')

class Result {
  constructor(obj) {
    this.id = obj.matchID
    const score = obj.accumulatedscore || []
    const fh = find(score, { periodvalue: 'FirstHalf' }) || {}
    const sh = find(score, { periodvalue: 'SecondHalf' }) || {}
    this.fh = {
      home: fh.home ? ~~fh.home : -1,
      away: fh.away ? ~~fh.away : -1
    }
    this.sh = {
      home: sh.home ? ~~sh.home : -1,
      away: sh.away ? ~~sh.away : -1
    }
    this.corner = obj.cornerresult ? ~~obj.cornerresult : -1
  }
}

module.exports = {
  init: async () => {
    try {
      const url = `https://bet.hkjc.com/football/getJSON.aspx?jsontype=results.aspx`
      const schedule = await axios.get(url).then(res => {
        const data = res.data
        const active = data ? find(data, { name: 'ActiveMatches' }) : false
        if (data && active && active.matches) {
          return active.matches.map(m => {
            return new Result(m)
          })
        } else {
          return []
        }
      })
      return schedule
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}