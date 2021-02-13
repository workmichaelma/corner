const moment = require('moment')
const { GraphQLScalarType } = require('graphql');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Datetime',
    serialize: (v) => {
      return v
    },
    parseValue: (v) => {
      return v
    },
    parseLiteral: (v) => {
      return v
    }
  })
}