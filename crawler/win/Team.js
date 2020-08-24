const axios = require('axios')
const moment = require('moment')
const map = require('lodash/map')

const url = (id, datetime) => `http://zq.win007.com/jsData/teamInfo/teamDetail/tdl${id}.js?version=${datetime}03`

const init = async ids => {
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
        // console.log()
        return teamDetail
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