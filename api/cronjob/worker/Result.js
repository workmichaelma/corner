const CHL = require('../models/CHL')
const Match = require('../models/Match')
const Result = require('../models/Result')
const axios = require('axios')
const map = require('lodash/map')
const compact = require('lodash/compact')
const moment = require('moment')
const { isEmpty } = require('lodash')

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

  async init() {
    return Match.updateResult({
      id: '5fb9523d-a661-4ce5-b802-20aa03af5761',
      HAD: 'H',
      FHA: 'H',
      OOE: 'O',
      FT: {
        home: '2',
        away: '1'
      },
      HT: {
        home: '1',
        away: '1'
      },
      corner: 8,
    })
    await this.getEndedMatches()
    // await this.getJcResult()
    // await this.getWinResult()

    // return this.mergeResult()

    return { a: this.endedMatches, b: this.jcResult, c: this.winResult, d: this.matches }
  }

  async getEndedMatches() {
    this.endedMatches = await Match.getNoResultMatchesWithDateRange({
      start: moment().subtract(14, 'days'),
      // end: moment().subtract(3, 'hours')
      end: moment().add(3, 'days')
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
      return map(this.endedMatches, m => {
        const { id, winId } = m
        const jc = this.jcResult[id]
        const win = this.winResult[winId]
  
        return Match.updateResult({
          ...jc,
          win
        })
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

}

module.exports = ResultClass