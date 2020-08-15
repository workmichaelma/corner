const axios = require('axios')
const find = require('lodash/find')
const moment = require('moment')

class Match {
  constructor(obj) {
    this.id = obj.matchID
    this.num = obj.matchNum
    this.day = obj.matchDay
    this.league = {
      id: obj.league.leagueNameCH,
      name: obj.league.leagueID
    }
    this.home = {
      id: obj.homeTeam.teamID,
      name: obj.homeTeam.teamNameCH
    }
    this.away = {
      id: obj.awayTeam.teamID,
      name: obj.awayTeam.teamNameCH
    }
    const dt = moment(obj.matchTime).utcOffset(8)
    this.date = dt.format('DD-MM-YYYY')
    this.time = dt.format('HH:mm')
    this.datetime = dt.format()
  }
}

module.exports = {
  init: async () => {
    try {
      const url = `https://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_had.aspx`
      const schedule = await axios.get(url).then(res => {
        const data = res.data
        const active = data ? find(data, { name: 'ActiveMatches' }) : false
        if (data && active && active.matches) {
          return active.matches.map(m => {
            return new Match(m)
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