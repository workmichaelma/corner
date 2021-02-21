const merge = require('lodash/merge')
const match = require('./match')
const schedule = require('./schdule')
const types = require('./types')
const odds = require('./odds')
const team = require('./team')

const obj = merge(
  {},
  schedule,
  match,
  types,
  odds,
  team,
)

module.exports = obj