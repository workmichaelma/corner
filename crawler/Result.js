const axios = require('axios')
const find = require('lodash/find')
const get = require('lodash/get')

class Result {
  constructor(obj) {
    const { HAD } = obj.results || {}
    if (HAD) {
      this.id = obj.matchID
      this.HAD = HAD
      const score = obj.accumulatedscore || []
      const ht = find(score, { periodvalue: 'FirstHalf' }) || {}
      const ft = find(score, { periodvalue: 'SecondHalf' }) || {}
      this.HT = {
        home: ht.home ? ~~ht.home : -1,
        away: ht.away ? ~~ht.away : -1
      }
      this.FT = {
        home: ft.home ? ~~ft.home : -1,
        away: ft.away ? ~~ft.away : -1
      }
      this.corner = obj.cornerresult ? ~~obj.cornerresult : -1
    }
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