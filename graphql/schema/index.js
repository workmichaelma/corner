module.exports = () => {
  const mergeGraphqlSchemas = require("merge-graphql-schemas");
  const fileLoader = mergeGraphqlSchemas.fileLoader;
  const mergeTypes = mergeGraphqlSchemas.mergeTypes;
  const types = fileLoader("./schema/types.gql");
  const match = fileLoader("./schema/match.gql");
  const team = fileLoader("./schema/team.gql");
  const schedule = fileLoader("./schema/schedule.gql");
  const league = fileLoader("./schema/league.gql");
  const result = fileLoader("./schema/result.gql");
  const odds = fileLoader("./schema/odds.gql");
  const tips = fileLoader("./schema/tips.gql");

  const gqlArray = [
    ...types,
    ...match,
    ...team,
    ...schedule,
    ...league,
    ...result,
    ...odds,
    ...tips,
  ];
  return mergeTypes(gqlArray, { all: true });
};
