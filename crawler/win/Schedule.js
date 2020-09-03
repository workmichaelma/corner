
// const trim = require('lodash/trim')
const axios = require('axios')
// const moment = require('moment')
// const iconv = require("iconv-lite")
// const cheerio = require('cheerio')
const map = require('lodash/map')


const init = async () => {
  const unix = Math.round(new Date())
  const data = await axios.get(`http://zhishu.35.zqsos.com:896/xml/odds3.aspx?companyid=1&t=1&${unix}`, {
    headers: {
      Host: 'zhishu.35.zqsos.com:896',
    }
  }).then(({ data }) => {
    const column = data.split('$')
    const matchs = column[1].split(';')
    return map(matchs, match => {
      const el = match.split(',')
      return {
        winId: el[0],
        winLeagueId: el[1],
        winDatetime: el[2],
        winHomeTeam: {
          id: el[4],
          name: el[6],
          rank: el[8]
        },
        winAwayTeam: {
          id: el[9],
          name: el[11],
          rank: el[13]
        }
      }
    })
  })
  // const analysis = d => d
  // const EuropeOdds = d => d
  // const dateStr = moment().utcOffset(8).format('YYYYMMDD')
  // const data = await axios.get(`http://bf.win007.com/football/big/Next_${dateStr}.htm`, { responseType: "arraybuffer" }).then(({ data }) => {
  //   const html = iconv.decode(data, 'gb2312')
  //   const $ = cheerio.load(html)
  //   const rows = $('#table_live > tbody').children().map((i, el) => {
  //     const tds = $(el).children()
  //     return {
  //       league: tds.eq(0).text(),
  //       time: moment(tds.eq(1).text(), 'MM-DD HH:mm'),
  //       home: ((td) => {
  //         const name = td.text()
  //         const rank = $(td).children().attr('name', 'order').text()
  //         return {
  //           rank: trim(trim(rank, '['), ']'),
  //           name: name.replace(rank, '')
  //         }
  //       })(tds.eq(3)),
  //       away: ((td) => {
  //         const name = td.text()
  //         const rank = $(td).children().attr('name', 'order').text()
  //         return {
  //           rank: trim(trim(rank, '['), ']'),
  //           name: name.replace(rank, '')
  //         }
  //       })(tds.eq(5)),
  //       wMatchId: ((td) => {
  //         const fn = $(td).children().last().attr('onclick')
  //         return eval(fn)
  //       })(tds.eq(7))
  //     }
  //   }).get()
  //   return rows
  // })
  return data
}

module.exports = {
  init
}