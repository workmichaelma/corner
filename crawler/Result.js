const axios = require('axios')
const get = require('lodash/get')
const find = require('lodash/find')
const forEach = require('lodash/forEach')
const isUndefined = require('lodash/isUndefined')

class Result {
  constructor(obj) {
    const { HAD, FHA, OOE } = obj.results || {}
    const score = obj.accumulatedscore || []
    const ht = find(score, { periodvalue: 'FirstHalf' }) || {}
    const ft = find(score, { periodvalue: 'SecondHalf' }) || {}

    if (HAD && FHA && OOE && ft.periodstatus === 'ResultFinal') {
      this.id = obj.matchID
      this.HAD = HAD
      this.FHA = FHA
      this.OOE = OOE
      this.HT = {
        home: ht.home ? ~~ht.home : -1,
        away: ht.away ? ~~ht.away : -1
      }
      this.FT = {
        home: ft.home ? ~~ft.home : -1,
        away: ft.away ? ~~ft.away : -1
      }
      this.corner = {
        total: !isUndefined(obj.cornerresult) ? ~~obj.cornerresult : -1
      }
      console.log(obj.cornerresult, this.corner.total)
    }
  }
}

module.exports = {
  Result,
  init: async () => {
    try {
      const url = `https://bet.hkjc.com/football/getJSON.aspx?jsontype=results.aspx`
      return axios.get(url).then(res => {
        const data = res.data
        const active = data ? find(data, { name: 'ActiveMatches' }) : false
        if (data && active && active.matches) {
          const matches = {}
          forEach(active.matches, m => {
            const match = new Result(m)
            if (match.id) {
              matches[match.id] = {
                ...match,
                corner: {
                  total: match.corner ? ~~match.corner.total : -1
                }
              }
            }
          })
          return matches
        } else {
          return {}
        }
      })
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}