const MatchQuery = require("../query/match.gql");
const { get } = require("lodash");

const { getMatch } = require("../dummy/match");

const isSSR = process.server;

module.exports = {
  fetchMatch: async ({ clients, id }) => {
    const client = isSSR ? clients.defaultClient : clients.alternativeClient;
    const { data } = await client.query({
      query: MatchQuery,
      variables: {
        id
      }
    });

    // const { data } = await getMatch(id)

    return get(data, "match", []);
  }
};
