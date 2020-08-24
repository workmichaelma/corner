const express = require('express');
const app = express();

const Win = require('./win')
const Odd = require('./Odd')
const Schedule = require('./Schedule')
const Result = require('./Result')

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

const port = 8082;

app.listen(port, () => console.log('Server running...'));