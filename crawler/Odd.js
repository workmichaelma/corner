const axios = require('axios')
const find = require('lodash/find')
const map = require('lodash/map')
const reduce = require('lodash/reduce')
const get = require('lodash/get')
const forEach = require('lodash/forEach')
const concat = require('lodash/concat')

const url = type => `https://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_${type}.aspx`

const requiredOddType = [
  'had',
  'hha',
  'hil',
  'fha',
  'fhl',
  'chl',
  'hdc',
]


const fixOddSlash = odd => {
  const [front, end] = odd.split('/')
  return front === end ? front : odd
}

const trim = w => {
  return (w || '').replace(/100@/g, '')
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

class HAD extends Dt {
  constructor(v = {}) {
    super()
    this.H = trim(v.H)
    this.D = trim(v.D)
    this.A = trim(v.A)
  }
}

class FHA extends Dt {
  constructor(v = {}) {
    super()
    this.H = trim(v.H)
    this.D = trim(v.D)
    this.A = trim(v.A)
  }
}

class HHA extends Dt {
  constructor(v = {}) {
    super()
    this.H = trim(v.H)
    this.D = trim(v.D)
    this.A = trim(v.A)
    this.HG = fixOddSlash(v.HG)
    this.AG = fixOddSlash(v.AG)
  }
}

class HIL extends Dt {
  constructor(v = {}) {
    super()
    const obj = find(v.LINELIST || [], { LINEORDER: '1' })
    if (obj) {
      this.H = trim(obj.H)
      this.L = trim(obj.L)
      this.LINE = fixOddSlash(obj.LINE)
    }
  }
}

class FHL extends Dt {
  constructor(v = {}) {
    super()
    const obj = find(v.LINELIST || [], { LINEORDER: '1' })
    if (obj) {
      this.H = trim(obj.H)
      this.L = trim(obj.L)
      this.LINE = fixOddSlash(obj.LINE)
    }
  }
}

class CHL extends Dt {
  constructor(v = {}) {
    super()
    const obj = find(v.LINELIST || [], { LINEORDER: '1' })
    if (obj) {
      this.H = trim(obj.H)
      this.L = trim(obj.L)
      this.LINE = fixOddSlash(obj.LINE.split('/')[0])
    }
  }
}

class HDC extends Dt {
  constructor(v = {}) {
    super()
    this.H = trim(v.H)
    this.A = trim(v.A)
    this.HG = fixOddSlash(v.HG)
    this.AG = fixOddSlash(v.AG)
  }
}

const oddSwitcher = (obj, type) => {
  switch (type) {
    case 'had':
      return new HAD(obj)
    case 'hha':
      return new HHA(obj)
    case 'fha':
      return new FHA(obj)
    case 'hil':
      return new HIL(obj)
    case 'fhl':
      return new FHL(obj)
    case 'chl':
      return new CHL(obj)
    case 'hdc':
      return new HDC(obj)
    default:
      return {}
  }
}

module.exports = {
  init: async () => {
    try {
      const data = await Promise.all(map(requiredOddType, async type => {
        const { data } = await axios.get(url(type))
        const active = find(data, { name: 'ActiveMatches' })
    
        if (active) {
          return {
            type,
            data: reduce(active.matches, (obj, v, k) => {
              if (new Date(v.matchTime) >= new Date()) {
                obj[v.matchID] = get(v, `${type}odds`)
              }
              return obj
            }, {}),
          }
        }
        return {
          type,
          data: {},
        }
      }))
    
      return reduce(data, (obj, v) => {
        const { type, data } = v
        forEach(data, (odd, id) => {
          obj[id] = {
            ...obj[id] || {},
            [type]: oddSwitcher(odd, type)
          }
        })
        return obj
      }, {})
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}