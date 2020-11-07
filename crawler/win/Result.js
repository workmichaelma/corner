const axios = require('axios')
const axiosRetry = require('axios-retry')
const cheerio = require('cheerio')
const async = require('async')
const map = require('lodash/map')
const get = require('lodash/get')
const find = require('lodash/find')
const head = require('lodash/head')
const delay = require('lodash/delay')
const reduce = require('lodash/reduce')
const filter = require('lodash/filter')
const isEmpty = require('lodash/isEmpty')
const isObject = require('lodash/isObject')

const isUndefined = require('lodash/isUndefined')
axiosRetry(axios, { reties: 5 })
// const url = id => `http://live.win007.com/detail/${id}.htm`

const url = id => `http://m.win007.com/analy/shijian/${id}.htm`

const fetchResult = async id => {
  return axios.get(url(id), { responseType: 'arraybuffer', headers: { Host: 'm.win007.com', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15', Referer: 'https://m.win007.com/' } }).then(({ data }) => {
    const $ = cheerio.load(data)

    const HTText = $('#scoreState span.row:not(.red)').text()
    const HT = HTText.replace(/[^\d-]/g, '').split('-') || []

    const stat = $('script:not([src])').map((i, el) => {
      try {
        const html = $(el).html()
        const findCookie = CheckAdEnabled = n => n
        eval(html)
        if (techData) {
          const itemList = get(techData, 'techStat.itemList', null)
          if (itemList !== null && isObject(itemList)) {
            return reduce(itemList, (obj, v) => {
              obj[v.kind] = {
                home: get(v, 'home.value'),
                away: get(v, 'away.value')
              }
              return obj
            }, {})
          }
        }
      } catch (err) {
        return {}
      }
    }).get()

    const statObj = head(filter(stat, e => !isEmpty(e)))

    const output = {
      winId: id,
      FT: {
        home: $('#homeScore').text(),
        away: $('#guestScore').text()
      },
      HT: {
        home: HT[0],
        away: HT[1]
      },
      statObj
    }

    if (!isEmpty(output.FT.home) && !isEmpty(output.HT.home) && !isEmpty(output.HT.away) && !isUndefined(get(statObj, 'CORNER.home')) && !isUndefined(get(statObj, 'HALF_CORNER.home')) !== false) {
      return {
        ...output,
        corner: statObj.CORNER.home + statObj.CORNER.away,
        half_corner: statObj.HALF_CORNER.home + statObj.HALF_CORNER.away
      }
    }
    return {}
  }).catch(err => {
    const { response } = err
    const { status = 500, config } = response || {}
    const { url = '' } = config || {}
    console.log('Result fetch data error', {
      status,
      url
    })
    return {}
  })
}

const init = async ids => {
  try {
    const fn = map(ids, id => {
      return (next) => {
        delay(async () => {
          const result = await fetchResult(id)
          next(null, result)
        }, 1000)
      }
    })
    return new Promise((resolve, reject) => {
      async.series(fn, function (errs, results) {
        resolve(results)
      })
    }).then(data => {
      return reduce(data, (obj, v) => {
        obj[v.winId] = v
        return obj
      }, {})
    })
  } catch (err) {
    console.log('win.result.js init() error')
    return {}
  }
}

module.exports = {
  init
}