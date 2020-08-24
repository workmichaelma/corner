const axios = require('axios')
const cheerio = require('cheerio')
const map = require('lodash/map')
const get = require('lodash/get')
const find = require('lodash/find')
const head = require('lodash/head')
const reduce = require('lodash/reduce')
const filter = require('lodash/filter')
const isEmpty = require('lodash/isEmpty')
const isObject = require('lodash/isObject')

const isUndefined = require('lodash/isUndefined')
// const url = id => `http://live.win007.com/detail/${id}.htm`

const url = id => `http://m.win007.com/analy/shijian/${id}.htm`

const init = async ids => {
  try {
    const data = await Promise.all(map(ids, id => {
      return axios.get(url(id), { responseType: 'arraybuffer' }).then(({ data }) => {
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

        if (!isEmpty(output.FT.home) && !isEmpty(output.HT.home) && !isEmpty(output.HT.away) && get(statObj, 'CORNER.home') && get(statObj, 'HALF_CORNER.home')) {
          return {
            ...output,
            corner: statObj.CORNER.home + statObj.CORNER.away,
            half_corner: statObj.HALF_CORNER.home + statObj.HALF_CORNER.away
          }
        }
        return {}
      })
    }))
    return reduce(data, (obj, v) => {
      obj[v.winId] = v
      return obj
    }, {})
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  init
}