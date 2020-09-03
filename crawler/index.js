const express = require('express');
const app = express();
const isString = require('lodash/isString')
const axios = require('axios')
const axiosRetry = require('axios-retry')

const Win = require('./win')
const Odd = require('./Odd')
const Schedule = require('./Schedule')
const Result = require('./Result')
const TeamHistory = require('./TeamHistory');

axiosRetry(axios, { reties: 10 })

axios.defaults.headers.common = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,zh-TW;q=0.7,zh;q=0.6',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive',
  'Host': 'bet.hkjc.com',
  'Referer': 'bet.hkjc.com',
  'Pragma': 'no-cache',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': 1,
  'User-Agent': '',
  // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
  'Cookie': 'ASP.NET_SessionId=vapqb0dt1obcogctndqxvyef; BotMitigationCookie_9518109003995423458="889311001599154509S1ulo2ugtqHZ0/+VmXn8UfpytD4="'
};

app.use('/win', Win)

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


app.get('/team-history', async (req, res) => {
  try {
    const { ids: _ids } = req.query
    if (isString(_ids)) {
      const ids = _ids.split(',')
      res.json(await TeamHistory.init(ids))
    } else {
      console.log('ids要string')
      res.json([])
    }
  } catch (err) {
    console.log(err)
    res.json({})
  }
})

const port = 8082;

app.listen(port, () => console.log('Server running...'));