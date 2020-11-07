const CHL = require('../models/CHL')
const Match = require('../models/Match')
const Result = require('../models/Result')
const axios = require('axios')
const map = require('lodash/map')
const compact = require('lodash/compact')
const moment = require('moment')
const { isEmpty, get, isUndefined, isInteger } = require('lodash')

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

  calcHAD(home, away) {
    try {
      if (isInteger(home) && isInteger(away)) {
        return home > away ? 'H' : away > home ? 'A' : 'D'
      } else {
        throw new Error('worker.Result.calcHAD() error: ', 'home or away is not a Integer')
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }

  calcResult({ FT, HT }) {
    const { home: ft_home, away: ft_away } = FT || {}
    const { home: ht_home, away: ht_away } = HT || {}
    if (!isUndefined(ht_home) && !isUndefined(ft_away) && !isUndefined(ht_home) && !isUndefined(ht_away)) {
      return {
        HAD: this.calcHAD(~~ft_home, ~~ft_away),
        FHA: this.calcHAD(~~ht_home, ~~ht_away),
        OOE: (~~ft_home + ~~ft_away % 2) === 0 ? 'E' : 'O',
        FT,
        HT
      }
    }
    return false
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
      limit: 20,
      result: false
    })
  }

  async getJcResult() {
    this.jcResult = await axios.get(this.url.jc).then(({data}) => data)
  }

  async getWinResult() {
    const ids = compact(map(this.endedMatches, ({ winId }) => winId)).join(',')
    if (!isEmpty(ids)) {
      this.winResult = await axios.get(`${this.url.win}${ids}`).then(({data}) => data)
    }
  }

  async mergeResult() {
    try {
      return Promise.all(map(this.endedMatches, async m => {
        try {
          const { id, winId } = m
          const jc = this.jcResult[id]
          const win = this.winResult[winId]

          const hasJc = !!get(jc, 'id')
          const hasWin = !!get(win, 'winId')

          console.log({hasJc, hasWin, jc, win})
          if (hasJc || hasWin) {
            const result = hasJc ? jc : hasWin ? this.calcResult({ FT: win.FT, HT: win.HT }) : false
            const cornerTotal = get(jc, 'corner.total', - 1) > -1 ? jc.corner.total : get(win, 'corner', -1) ? win.corner : false
            if (result !== false && cornerTotal !== false) {
              return Match.find_Update_Insert({
                id,
                result: {
                  ...result,
                  corner: {
                    total: cornerTotal,
                    ...win.statObj ? {
                      home: get(win, 'statObj.CORNER.home', -1),
                      away: get(win, 'statObj.CORNER.away', -1),
                    } : {}
                  }
                }
              })
            }
          }
          return {}
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