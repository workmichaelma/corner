const Match = require('../models/Match')
const League = require('../models/League')
const Team = require('../models/Team')
const axios = require('axios')
const uniq = require('lodash/uniq')
const find = require('lodash/find')
const { API_DOMAIN } = require('../../config')

class TeamClass {
  constructor(team) {
    this.team = team
  }

  async get() {
    const team = await Team.find({ id: team.id }).then(t => t)
    if (team) {
      return team._id
    } else {
      const newTeam = new Team(team)
      return await newTeam.save()
    }
  }
}

class LeagueClass {
  constructor(league) {
    this.league = league
  }

  async get() {
    const league = await League.find({ id: league.id }).then(t => t)
    if (league) {
      return league._id
    } else {
      const newLeague = new League(league)
      return await newLeague.save()
    }
  }
}

class MatchClass {
  constructor() {
    this.url = `${API_DOMAIN}/schedule`
    this.matches = {
      current: [],
      future: []
    }
  }

  async init() {
    await this.getCurrent()
    await this.getFuture()
    
    return await this.update()
  }

  async getFuture() {
    this.matches.future = await axios.get(this.url).then(res => {
      return res.data && res.data.length ? res.data : []
    })
  }

  async getCurrent() {
    const params = {
      datetime: {
        $gte: new Date()
      }
    }
    this.matches.current = await Match.find(params).then(matches => {
      return matches
    })
  }

  async transform(match) {
    const league = new LeagueClass(match.league)
    const home = new TeamClass(match.home)
    const away = new TeamClass(match.away)
    
    const newMatch = await (async ({ league, home, away, match }) => {
      console.log(league, home, away, match)
      return new Match({
        ...match,
        ...{ home },
        ...{ away },
        ...{ league }
      })
    })({ league, home, away, match })
    return newMatch
    // return newMatch.save()
  }

  async update() {
    const current = this.matches.current.map(m => m.id)
    const future = this.matches.future.map(m => m.id)

    const newId = uniq([...current, ...future])
    return await Promise.all(await newId.map(async id => {
      const match = find(this.matches.future, { id })
      if (match) {
        // const newMatch = new Match(match)
        // const newMatch = await this.transform(match)
        // return newMatch
        return match
      }
    }))

    // return [...current, ...future]
  }

}

module.exports = MatchClass