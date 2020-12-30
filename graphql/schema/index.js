module.exports = () => {
  const mergeGraphqlSchemas = require('merge-graphql-schemas')
  const fileLoader = mergeGraphqlSchemas.fileLoader
  const mergeTypes = mergeGraphqlSchemas.mergeTypes
  const match = fileLoader('./schema/match.gql')
  const team = fileLoader('./schema/team.gql')
  const schedule = fileLoader('./schema/schedule.gql')
  const league = fileLoader('./schema/league.gql')
  const result = fileLoader('./schema/result.gql')

  const gqlArray = [
    ...match,
    ...team,
    ...schedule,
    ...league,
    ...result
  ]
  return mergeTypes(gqlArray, { all: true })
}
