const merge = require('lodash/merge')
const match = require('./match')
const schedule = require('./schdule')

const obj = merge(
  {},
  schedule,
  match
)

module.exports = obj