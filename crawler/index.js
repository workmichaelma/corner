const express = require('express');
const app = express();

const Odd = require('./Odd')
const Schedule = require('./Schedule')
const Result = require('./Result')

const trim = require('lodash/trim')
const axios = require('axios')
const iconv = require("iconv-lite");
const cheerio = require('cheerio')

const analysis = d => d
const EuropeOdds = d => d

app.get('/win/schedule', async (req, res) => {
  const data = await axios.get(`http://bf.win007.com/football/big/Next_20200606.htm`, { responseType: "arraybuffer" }).then(({ data }) => {
    const html = iconv.decode(data, 'gb2312')
    const $ = cheerio.load(html)
    const rows = $('#table_live > tbody').children().map((i, el) => {
      const tds = $(el).children()
      const d = {
        league: tds.eq(0).text(),
        home: ((td) => {
          const name = td.text()
          const rank = $(td).children().attr('name', 'order').text()
          return {
            rank: trim(trim(rank, '['), ']'),
            name: name.replace(rank, '')
          }
        })(tds.eq(3)),
        away: ((td) => {
          const name = td.text()
          const rank = $(td).children().attr('name', 'order').text()
          return {
            rank: trim(trim(rank, '['), ']'),
            name: name.replace(rank, '')
          }
        })(tds.eq(5)),
        wMatchId: ((td) => {
          const fn = $(td).children().last().attr('onclick')
          return eval(fn)
        })(tds.eq(7))
      }
      return d
    }).get()
    return rows
  })
  res.json(data)
})

app.get('/odd', async (req, res) => {
  try {
    res.json(await Odd.init())
  } catch (err) {
    console.log(err)
    res.status(404).json({})
  }
})

app.get('/schedule', async (req, res) => {
  try {
    res.json(await Schedule.init())
  } catch (err) {
    console.log(err)
    res.json({})
  }
})

app.get('/result', async (req, res) => {
  try {
    res.json(await Result.init())
  } catch (err) {
    console.log(err)
    res.json({})
  }
})

const port = 8082;

app.listen(port, () => console.log('Server running...'));