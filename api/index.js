const express = require('express');
const map = require('lodash/map')
const app = express();
const mongoose = require('./mongoose')

const cronjob = require('./cronjob/index')

// const Odd = require('./Odd')
// const Schedule = require('./Schedule')
// const Result = require('./Result')
app.get('/', (req, res) => {
  console.log(req, res)
  res.json({})
})
app.use('/cronjob', cronjob)

app.use((req, res, next) => {
  console.log(req, res)
  next()
})

// app.get('/odd', async (req, res) => {
//   try {
//     res.json(await Odd.init())
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({})
//   }
// })

// app.get('/schedule', async (req, res) => {
//   try {
//     res.json(await Schedule.init())
//   } catch (err) {
//     console.log(err)
//     res.json({})
//   }
// })

// app.get('/result', async (req, res) => {
//   try {
//     res.json(await Result.init())
//   } catch (err) {
//     console.log(err)
//     res.json({})
//   }
// })

const port = 8083;

app.listen(port, () => console.log('Server running...'));