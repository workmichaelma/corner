const Match = require('../models/Match')
const League = require('../models/League')
const Team = require('../models/Team')
const axios = require('axios')
const moment = require('moment')
const map = require('lodash/map')
const uniq = require('lodash/uniq')
const find = require('lodash/find')
const reduce = require('lodash/reduce')
const compact = require('lodash/compact')
const forEach = require('lodash/forEach')
const toInteger = require('lodash/toInteger')
const { API_DOMAIN } = require('../../config')
const { get, isEmpty, difference } = require('lodash')

const saveMatch = async ({ jc, win }) => {
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
      away: away_id,
      datetime: moment(jc.datetime).toDate(),
      ...winValid ? {
        winId
      } : {}
    })
  } catch (err) {
    console.log(err)
    return {}
  }
}

// 對一對 馬會 同 球探 既比賽時間，如果一樣，即為相同比賽
const compareJcAndWinMatch = (jc, wins) => {
  if (wins === null) {
    return null
  }
  const {
    datetime: jcDatetime
  } = jc

  return reduce(wins, (obj, v) => {
    if (obj === null) {
      const { winDatetime } = v
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
    // 拿取在 db 裡儲存的未來比賽資料
    await this.getCurrent()
    // 拿取 即時 的未來比賽資料
    await this.getFuture()
    
    // 先對比 db 與 即時 的未來賽程，將會更新一些未有winId的比賽，並且儲存一些新比賽
    return await this.update()
  }

  async getFuture() {
    this.matches.future = await axios.get(this.url).then(res => {
      return res.data && res.data.length ? res.data : []
    })
  }

  async getCurrent() {
    this.matches.current = await Match.getFutureMatches()
  }

  async update() {
    const future = this.matches.future.map(m => m.id)

    const newIds = compact(map(future, id => {
      const { winId } = find(this.matches.current, { id }) || {}
      return !winId && id
    }))

    if (!isEmpty(newIds)) {
      return this.saveMatchsWithWin(newIds)
    } else {
      console.log('搵唔到新比賽')
      return []
    }
  }

  // 若球隊有 winId, 則先會搜尋 winTeamMatchMap 有否此隊伍的 winId 有否存在於 win schedule 中
  // 若球隊冇 winId, 則會搜尋 winTeamMatchMap 有否此隊伍的 隊伍中文名稱 有否存在於 win schedule 中
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

  async saveMatchsWithWin(ids) {
    const matches = map(ids, id => {
      return find(this.matches.future, { id })
    })
    const winMatches = await axios.get(`${API_DOMAIN}/win/schedule`).then(res => {
      const { data } = res
      return data
    })

    const winTeamMatchMap = {
      id: {},
      name: {}
    }

    // 將 Array of Object 的比賽變為 winId: obj
    // winTeamMatchMap.id = winId: winData
    // winTeamMatchMap.name = winTeamName: winData
    
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

      // 利用球隊 winId / 名稱 搜尋 winTeamMatchMap 中有否win的比賽
      const winMatch = await this.mapJcToWinMatch(m, winTeamMatchMap)

      return saveMatch({ jc: m, win: winMatch })
    }))
  }
}

module.exports = MatchClass