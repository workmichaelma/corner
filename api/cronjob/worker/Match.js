const Match = require('../models/Match')
const League = require('../models/League')
const Team = require('../models/Team')
const axios = require('axios')
const moment = require('moment')
const map = require('lodash/map')
const uniq = require('lodash/uniq')
const find = require('lodash/find')
const reduce = require('lodash/reduce')
const forEach = require('lodash/forEach')
const toInteger = require('lodash/toInteger')
const { API_DOMAIN } = require('../../config')
const { get, isEmpty } = require('lodash')

const saveMatch = async (jc, win) => {
  try {
    const winValid = !isEmpty(win) && get(win, 'winId')
    const { winLeagueId, winId, winHomeTeam, winAwayTeam } = win || {}
    const { id: winHomeId, rank: homeRank } = winHomeTeam || {}
    const { id: winAwayId, rank: awayRank } = winAwayTeam || {}

    const { _id: league_id } = await League.find_Update_Insert({
      id: jc.league.id,
      name: jc.league.name,
      ...(winValid && winLeagueId) ? {
        winId: winLeagueId
      } : {}
    })

    const { _id: home_id } = await Team.find_Update_Insert({
      id: jc.home.id,
      name: jc.home.name,
      ...(winValid && winHomeId) ? {
        winId: winHomeId
      } : {}
    })

    const { _id: away_id } = await Team.find_Update_Insert({
      id: jc.away.id,
      name: jc.away.name,
      ...(winValid && winAwayId) ? {
        winId: winAwayId
      } : {}
    })

    return Match.find_Update_Insert({
      ...jc,
      homeRank,
      awayRank,
      league: league_id,
      home: home_id,
      away: away_id
    })
  } catch (err) {
    console.log(err)
    return {}
  }
}

const compareJcAndWinMatch = (jc, wins) => {
  if (wins === null) {
    return null
  }
  const {
    home: jcHome,
    away: jcAway,
    datetime: jcDatetime
  } = jc

  const {
    name: jcHomeName
  } = jcHome

  const {
    name: jcAwayName
  } = jcAway

  return reduce(wins, (obj, v) => {
    if (obj === null) {
      const { winHomeTeam, winAwayTeam, winDatetime } = v
      return (new Date(toInteger(winDatetime)).getTime() === new Date(jcDatetime).getTime()) ? v : null
    }
    return obj
  }, null)
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
    // await this.getCurrent()
    await this.getFuture()
    
    return this.combineWinMatchs(this.matches.future)
    // return await this.update()
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

  async mapJcToWinMatch(jcMatch, winTeamMatchMap) {
    let winMatch = null
    const {
      home,
      away,
      winHomeId,
      winAwayId
    } = jcMatch

    const { name: jcHomeName } = home
    const { name: jcAwayName } = away

    if (winHomeId) {
      winMatch = compareJcAndWinMatch(jcMatch, get(winTeamMatchMap.id, winHomeId, null))
    }

    if (winMatch === null && winAwayId) {
      winMatch = compareJcAndWinMatch(jcMatch, get(winTeamMatchMap.id, winAwayId, null))
    }

    if (winMatch === null && jcHomeName) {
      winMatch = compareJcAndWinMatch(jcMatch, get(winTeamMatchMap.name, jcHomeName, null))
    }

    if (winMatch === null && jcAwayName) {
      winMatch = compareJcAndWinMatch(jcMatch, get(winTeamMatchMap.name, jcAwayName, null))
    }

    return winMatch
  }

  async combineWinMatchs(matches) {
    const winMatches = await axios.get(`${API_DOMAIN}/win/schedule`).then(res => {
      const { data } = res
      return data
    })

    const winTeamMatchMap = {
      id: {},
      name: {}
    }

    forEach(winMatches, m => {
      const { id: homeId, name: homeName } = get(m, 'winHomeTeam', {})
      const { id: awayId, name: awayName } = get(m, 'winAwayTeam', {})
      const winId = get(m, 'winId')
      if (winId) {
        if (homeId) {
          winTeamMatchMap.id[homeId] = [
            ...winTeamMatchMap.id[homeId] || [],
            m
          ]
        }
        if (homeName) {
          winTeamMatchMap.name[homeName] = [
            ...winTeamMatchMap.name[homeName] || [],
            m
          ]
        }
        if (awayId) {
          winTeamMatchMap.id[awayId] = [
            ...winTeamMatchMap.id[awayId] || [],
            m
          ]
        }
        if (awayName) {
          winTeamMatchMap.name[awayName] = [
            ...winTeamMatchMap.name[awayName] || [],
            m
          ]
        }
      }
    })
    
    return Promise.all(await map(matches, async m => {
      const homeTeam = await Team.find_Update_Insert(m.home)
      const awayTeam = await Team.find_Update_Insert(m.away)

      m.winHomeId = homeTeam.winId
      m.winAwayId = awayTeam.winId

      const winMatch = await this.mapJcToWinMatch(m, winTeamMatchMap)

      return await saveMatch(m, winMatch)
    }))
  }
}

module.exports = MatchClass