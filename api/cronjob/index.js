const express = require('express');
const app = express();

const Odd = require('./worker/Odd')
const Match = require('./worker/Match')
// const Result = require('./worker/Result')

app.get('/odd', async (req, res) => {
  try {
    const worker = new Odd()
    res.json(await worker.update())
  } catch (err) {
    console.log(err)
    res.status(404).json({})
  }
})

app.get('/match', async (req, res) => {
  try {
    const worker = new Match()
    res.json(await worker.init())
  } catch (err) {
    console.log(err)
    res.json({})
  }
})

// app.get('/result', async (req, res) => {
//   try {
//     res.json(await Result.init())
//   } catch (err) {
//     console.log(err)
//     res.json({})
//   }
// })

module.exports = app