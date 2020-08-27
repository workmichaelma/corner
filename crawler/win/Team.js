const axios = require('axios')
const axiosRetry = require('axios-retry')
const moment = require('moment')
const map = require('lodash/map')
const get = require('lodash/get')
const take = require('lodash/take')
const reduce = require('lodash/reduce')
const isObject = require('lodash/isObject')

const Result = require('./Result')

axiosRetry(axios, { reties: 5 })

const url = (id, datetime) => `http://zq.win007.com/jsData/teamInfo/teamDetail/tdl${id}.js?version=${datetime}03`

const init = async (ids, _fields) => {
  const fields = isObject(_fields) ? _fields : {
    id: true,
    name: true,
    imageUrl: true,
    history: true,
    future: false
  }
  const datetime = moment().utcOffset(8).format('YYYYMMDD')
  try {
    const data = await Promise.all(map(ids, id => {
      return axios.get(url(id, datetime), {
        headers: {
          Referer: `http://zq.win007.com/big/team/Summary/${id}.html`,
          Host: 'zq.win007.com',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.3',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,zh-TW;q=0.7,zh;q=0.6',
          Connection: 'keep-alive'
        }
      }).then(({ data }) => {
        eval(data)
        return reduce(fields, (obj, v, k) => {
          switch (k) {
            case 'id':
              obj[k] = teamDetail[0]
              break
            case 'name':
              obj[k] = teamDetail[2]
              break
            case 'imageUrl':
              obj[k] = `http://zq.win007.com/Image/team/${teamDetail[4]}`
              break
            //数组格式0赛程ID,1联赛ID，2联赛颜色，3时间，4主队ID，5客队ID，6比分，7半场比分,8联赛简体名，9联赛繁体名，10联赛英文名，11主队简体，12主队繁体，13主队英文，14客队简体，15客队繁体，16客队英文,17主红，18客红，20让球盘口，21让球盘路，22大小球盘路，23赛果盘路
            // case 'future':
            case 'history':
              obj[k] = map(take(teamCount, 20), m => {
                return {
                  winId: m[0],
                  homeTeam: {
                    id: m[1],
                    name: get((m[7] || '').split('^'), '[1]', '')
                  },
                  awayTeam: {
                    id: m[2],
                    name: get((m[8] || '').split('^'), '[1]', '')
                  },
                  league: {
                    id: m[4],
                    name: get((m[5] || '').split('^'), '[1]', '')
                  },
                  matchTime: moment(m[3], 'YYYY-MM-DD HH:mm').format(),
                  // result: {
                  //   FT: {
                  //     home: m[9],
                  //     away: m[10]
                  //   }
                  // }
                }
              })
              break
          }
          return obj
        }, {})
      }).then(async obj => {
        if (fields.history) {
          const fullResult = await Result.init(map(get(obj, 'history', []), 'winId'))
          obj.history = map(get(obj, 'history', []), m => {
            return {
              ...m,
              result: fullResult[m.winId]
            }
          })
        }
        return obj
      })
    }))
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  init
}