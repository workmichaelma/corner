const CHL = require('../models/CHL')
const axios = require('axios')
const isObject = require('lodash/isObject')
const { map, reduce, isEqual } = require('lodash')

const Match = require('../models/Match')

class Odd {
  constructor() {
    this.url = `http://crawler:8082/odd`
    this.targetMatches = []
  }

  preprocessOdds({ newOdds, oldOdds }) {
    return reduce(newOdds, (obj, odd, type) => {
      let needUpdate = false
      if (isObject(oldOdds[type])) {
        const { datetime: oldDatetime, _id: old_id, ...oldOdd } = oldOdds[type]
        const { datetime: newDatetime, ...newOdd } = odd
        if (!isEqual(oldOdd, newOdd)) {
          needUpdate = true
        }
      } else {
        needUpdate = true
      }

      if (needUpdate) {
        obj[`odds.${type}`] = {
          ...odd,
          datetime: new Date(odd.datetime)
        }
      }
      return obj
    }, {})
  }

  async saveOdds(odds) {
    const result = await Promise.all(map(this.targetMatches, async match => {
      const { id, ...oldOdds } = match
      const newOdds = odds[id]
      if (newOdds) {
        const oddsToInsert = this.preprocessOdds({ newOdds, oldOdds })
        return Match.insertOdds({ id, odds: oddsToInsert })
      }
      return {
        id: match.id,
        inserted: []
      }
    }))

    return result
  }

  async update() {
    try {
      this.targetMatches = await Match.getFutureMatchesWithLatestOdd()
      const odds = await axios.get(this.url).then(res => {
        return res.data && isObject(res.data) ? res.data : {}
      })
      return this.saveOdds(odds)
    } catch (err) {
      console.log(err, 'odd update error')
      return []
    }
  }

}

module.exports = Odd