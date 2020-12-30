const CHL = require('../models/CHL')
const Match = require('../models/Match')
const Result = require('../models/Result')
const Team = require('../models/Team')
const axios = require('axios')
const map = require('lodash/map')
const head = require('lodash/head')
const compact = require('lodash/compact')
const moment = require('moment')
const { find, isEmpty, get, range, reduce, isNull } = require('lodash')

class HistoryClass {
  constructor() {
    this.url = {
      jc: ids => `http://crawler:8082/team-history?ids=${ids}`,
      win: ids => `http://crawler:8082/win/team?ids=${ids}`,
    }

    this.teams = []
  }

  async init() {
    const { homeTeam, awayTeam, id: matchId } = await this.getTeams()
    if (homeTeam.winId) {
      this.teams.push(homeTeam)
    }
    if (awayTeam.winId) {
      this.teams.push(awayTeam)
    }
    this.matchId = matchId

    if (matchId && !isEmpty(this.teams)) {
      console.log('Fetching TeamHistory:', {matchId, teams: this.teams})
      return this.fetchHistory()
    } else { 
      return []
    }
  }

  async getTeams() {
    try {
      const result = await Match.aggregate([
        {
          '$match': {
            'updatedHistory': {
              '$ne': true
            }, 
            'datetime': {
              '$gt': new Date()
            }
          }
        }, {
          '$lookup': {
            'from': 'teams', 
            'localField': 'home', 
            'foreignField': '_id', 
            'as': 'homeTeam'
          }
        }, {
          '$lookup': {
            'from': 'teams', 
            'localField': 'away', 
            'foreignField': '_id', 
            'as': 'awayTeam'
          }
        }, {
          '$unwind': '$homeTeam'
        }, {
          '$unwind': '$awayTeam'
        }, {
          '$match': {
            '$or': [
              {
                'homeTeam.winId': {
                  '$exists': true
                }
              },
              {
                'awayTeam.winId': {
                  '$exists': true
                }
              }
            ]
          }
        }, {
          '$sort': {
            'datetime': 1, 
            'num': 1
          }
        }, {
          '$limit': 1
        }
      ])
      return head(result)
    } catch (err) {
      console.log('cronjob.work.TeamHistory getTeams()', err)
      return []
    }
  }

  async fetchHistory() {
    const ids = reduce(this.teams, (arr, t) => {
      return [
        ...arr,
        {
          jc: t.id,
          win: t.winId
        }
      ]
    }, [])

    const jcData = await this.fetchJcHistory(map(ids, i => i.jc))
    const winData = await this.fetchWinHistory(map(ids, i => i.win))

    return reduce(jcData, (obj, arr, id) => {
      obj[id] = compact(map(arr, v => {
        const winId = get(find(ids, { jc: id }), 'win')
        if (winId) {
          return this.matchingJcWithWin(winId, v, winData)
        }
        return []
      }))
      return obj
    }, {})
  }

  async fetchJcHistory(ids) {
    try {
      return axios.get(this.url.jc(ids)).then(({data}) => data)
    } catch (err) {
      console.log(`fetchJCHistory: [ ${ids} ]`, err)
      return {}
    }
  }

  async fetchWinHistory(ids) {
    try {
      return axios.get(this.url.win(ids)).then(({ data = {} }) => {
        return reduce(data, (obj, d) => {
          const { history = [], imageUrl = '', id } = d
          if (imageUrl) {
            Team.find_Update_Insert({winId: id + '', image: imageUrl})
          }
          obj[d.id] = reduce(history, (o, m) => {
            const datetime = moment(m.matchTime)
            if (datetime.isValid()) {
              o[datetime.unix()] = m
            }
            return o
          }, {})
          return obj
        }, {})
      }).catch((err) => {
        console.log('fetchWinHistory error', {ids})
        return {}
      })
    } catch (err) {
      console.log(`fetchWinHistory: [ ${ids} ]`, err)
      return {}
    }
  }

  async matchingJcWithWin(winId, jc, wins) {
    try {
      const { datetime } = jc
      const matchTime = moment(datetime)
      if (matchTime.isValid()) {
        const win = get(wins, `[${winId}][${matchTime.unix()}]`)
        if (!isEmpty(jc.result)) {
          const output = {
            win: !isEmpty(win) ? {
              winId: win.winId,
              winLeagueId: win.league.id,
              winHomeTeam: {
                id: win.homeTeam.id
              },
              winAwayTeam: {
                id: win.awayTeam.id
              },
            } : {},
            jc,
            result: {
              ...jc.result,
              corner: {
                total: ~~get(jc, 'result.corner.total', -1) > -1 ? jc.result.corner.total : get(win, 'result.total', -1),
                ...(get(win, 'result') ? {
                  home: get(win, 'result.statObj.CORNER.home', -1),
                  away: get(win, 'result.statObj.CORNER.away', -1),
                } : {})
              }
            }
          }
  
          await Match.saveMatchWithWin(output)
          await Match.find_Update_Insert({
            id: this.matchId,
            updatedHistory: true
          })
  
          return output
        }
      }
      return {}
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}

module.exports = HistoryClass