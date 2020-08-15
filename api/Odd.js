const axios = require('axios')
const find = require('lodash/find')
const reduce = require('lodash/reduce')

const trim = w => {
  return w.replace(/100@/g, '')
}

class Dt {
  constructor() {
    this.datetime = new Date()
  }
}

class Odd extends Dt {
  constructor(obj) {
    super()
    this.id = obj.matchID
    this.chl = new CHL(obj.chlodds)
  }
}

class CHL extends Dt {
  constructor(chl) {
    super()
    const obj = find(chl.LINELIST || [], { LINEORDER: '1' })
    if (obj) {
      this.H = trim(obj.H)
      this.L = trim(obj.L)
      this.LINE = obj.LINE.split('/')[0]
    }
  }
}

module.exports = {
  init: async () => {
    try {
      const url = `https://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_chl.aspx`
      return await axios.get(url).then(res => {
        const data = res.data
        const active = data ? find(data, { name: 'ActiveMatches' }) : false
        if (data && active && active.matches) {
          return reduce(active.matches, (arr, v, k) => {
            if (new Date(v.matchTime) >= new Date()) arr.push(new Odd(v))
            return arr
          }, [])
        } else {
          return []
        }
      })
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}