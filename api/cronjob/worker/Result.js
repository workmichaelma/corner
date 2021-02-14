const CHL = require('../models/CHL')
const Match = require('../models/Match')
const Result = require('../models/Result')
const axios = require('axios')
const map = require('lodash/map')
const compact = require('lodash/compact')
const moment = require('moment')
const { isEmpty, get, isUndefined, isInteger, isNull, isObject, head, last, reduce, isArray } = require('lodash')

const { getHADResult, getHHAResult, getHDCResult, getCHLResult, getGoalHLResult } = require('../utils/result')

class ResultClass {
  constructor() {
    this.url = {
      jc: `http://crawler:8082/result`,
      win: `http://crawler:8082/win/result?ids=`,
    }

    this.endedMatches = []
    this.jcResult = {}
    this.winResult = {}
  }

  calcHHA({ odds, home, away }) {
    const { first, latest } = odds || {}

    if (isObject(first) && isObject(latest) && home > -1 && away > -1) {
      return {
        first: getHHAResult({ odd: first, home, away }),
        latest: getHHAResult({ odd: latest, home, away }),
      }
    }
    return null
  }

  calcHDC({ odds, home, away }) {
    const { first, latest } = odds || {}

    if (isObject(first) && isObject(latest) && home > -1 && away > -1) {
      return {
        first: getHDCResult({ odd: first, home, away }),
        latest: getHDCResult({ odd: latest, home, away }),
      }
    }
    return null
  }

  calcCHL({ odds, corner }) {
    const { first, latest } = odds || {}

    if (isObject(first) && isObject(latest) && corner > -1) {
      return {
        first: getCHLResult({ odd: first, corner }),
        latest: getCHLResult({ odd: latest, corner }),
      }
    }
    return null
  }

  calcGoalHL({ odds, home, away }) {
    const { first, latest } = odds || {}
    const _home = parseInt(home)
    const _away = parseInt(away)

    if (isObject(first) && isObject(latest) && !isNaN(_home) && !isNaN(_away)) {
      const goals = home + away
      return {
        first: getGoalHLResult({ odd: first, goals }),
        latest: getGoalHLResult({ odd: latest, goals }),
      }
    }
    return null
  }

  calcHAD(home, away) {
    return getHADResult({ home, away })
  }

  calcResult({ FT, HT }) {
    const { home: ft_home, away: ft_away } = {
      home: parseInt(get(FT, 'home', -1)),
      away: parseInt(get(FT, 'away', -1)),
    }
    const { home: ht_home, away: ht_away } = {
      home: parseInt(get(HT, 'home', -1)),
      away: parseInt(get(HT, 'away', -1)),
    }
    if (!isNaN(ht_home) && !isNaN(ft_away) && !isNaN(ht_home) && !isNaN(ht_away)) {
      return {
        HAD: this.calcHAD(ft_home, ft_away),
        FHA: this.calcHAD(ht_home, ht_away),
        FT,
        HT
      }
    }
    return {}
  }

  async init() {
    await this.getEndedMatches()
    await this.getJcResult()
    await this.getWinResult()

    return this.mergeResult()
  }

  async getEndedMatches() {
    this.endedMatches = await Match.getNoResultMatchesWithDateRange({
      start: moment().subtract(14, 'days'),
      end: moment().subtract(4, 'hours'),
      limit: 10,
      result: false
    })
  }

  async getJcResult() {
    this.jcResult = await axios.get(this.url.jc).then(({data}) => data)
  }

  async getWinResult() {
    const ids = compact(map(this.endedMatches, 'winId')).join(',')
    if (!isEmpty(ids)) {
      this.winResult = await axios.get(`${this.url.win}${ids}`).then(({data}) => data)
    }
  }

  transformOddsToFirstAndLatest({ odds }) {
    return reduce(odds, (obj, oddArray, type) => {
      if (isArray(oddArray)) {
        obj[type] = {
          first: head(oddArray),
          latest: last(oddArray),
        }
      }
      return obj
    }, {})
  }

  buildResult({ jc, win, match }) {
    const { id, winId, odds } = match || {}
    let result = {
      id,
      winId,
      HT: {
        home: -1,
        away: -1,
      },
      FT: {
        home: -1,
        away: -1
      },
      corner: {
        full: {
          total: -1,
          home: -1,
          away: -1,
        },
        half: {
          total: -1,
          home: -1,
          away: -1,
        }
      },
      HAD: null,
      FHA: null,
      HHA: null,
      HDC: null,
      HIL: null,
      FHL: null,
      CHL: null
    }

    if (isObject(jc)) {
      result = {
        ...result,
        HAD: jc.HAD,
        FHA: jc.FHA,
        HT: {
          home: get(jc, 'HT.home'),
          away: get(jc, 'HT.away'),
        },
        FT: {
          home: get(jc, 'FT.home'),
          away: get(jc, 'FT.away'),
        },
      }
      if (get(jc, 'corner.total', -1) > -1) {
        result = {
          ...result,
          corner: {
            full: {
              total: jc.corner.total
            }
          }
        }
      }
    }

    if (isObject(win)) {
      const { FT, HT, HAD, FHA } = this.calcResult({ FT: win.FT, HT: win.HT })
      const corner = {
        full: get(win, 'corner', -1),
        half: get(win, 'half_corner', -1)
      }
      result = {
        ...result,
        HAD: isNull(result.HAD) ? HAD : result.HAD,
        FHA: isNull(result.FHA) ? FHA : result.FHA,
        FT: get(result, 'FT.home', -1) < 0 ? FT : result.FT,
        HT: get(result, 'HT.home', -1) < 0 ? HT : result.HT,
        corner: {
          full: {
            total: corner.full,
            home: get(win, 'statObj.CORNER.home', corner.full === 0 ? 0 : -1),
            away: get(win, 'statObj.CORNER.away', corner.full === 0 ? 0 : -1),
          },
          half: {
            total: corner.half,
            home: get(win, 'statObj.HALF_CORNER.home', corner.half === 0 ? 0 : -1),
            away: get(win, 'statObj.HALF_CORNER.away', corner.half === 0 ? 0 : -1),
          }
        },
      }
    }

    if (isObject(odds)) {
      const _odds = this.transformOddsToFirstAndLatest({ odds })
      result = {
        ...result,
        HHA: this.calcHHA({ odds: get(_odds, 'hha', {}), home: get(result, 'FT.home', -1), away: get(result, 'FT.away', -1) }),
        HDC: this.calcHDC({ odds: get(_odds, 'hdc', {}), home: get(result, 'FT.home', -1), away: get(result, 'FT.away', -1) }),
        CHL: this.calcCHL({ odds: get(_odds, 'chl', {}), corner: get(result, 'corner.full.total', -1) }),
        HIL: this.calcGoalHL({ odds: get(_odds, 'hil', {}), home: get(result, 'FT.home', -1), away: get(result, 'FT.away', -1) }),
        FHL: this.calcGoalHL({ odds: get(_odds, 'fhl', {}), home: get(result, 'HT.home', -1), away: get(result, 'HT.away', -1) })
      }
    }

    return result
  }

  async mergeResult() {
    try {
      return Promise.all(map(this.endedMatches, async m => {
        try {
          const { id, winId } = m
          const jc = this.jcResult[id]
          const win = this.winResult[winId]

          const hasJc = !!get(jc, 'id')
          const hasWin = !!get(win, 'winId') && get(win, 'corner', -1) > -1

          if (hasJc || hasWin) {
            const result = this.buildResult({
              jc: hasJc ? jc : null,
              win: hasWin ? win : null,
              match: m,
            })

            return Match.updateResult(result)
          }
          return {
            id,
            winId
          }
        } catch (err) {
          console.error('Update result error: ', err)
          return err
        }
      }))
    } catch (err) {
      console.error('worker.mergeResult(): ', err)
      return {}
    }
  }

}

module.exports = ResultClass