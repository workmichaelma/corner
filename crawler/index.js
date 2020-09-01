const express = require('express');
const app = express();
const isString = require('lodash/isString')

const Win = require('./win')
const Odd = require('./Odd')
const Schedule = require('./Schedule')
const Result = require('./Result')
const TeamHistory = require('./TeamHistory')

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