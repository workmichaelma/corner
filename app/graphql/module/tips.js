const TipsQuery = require("../query/tips.gql");
const { get } = require("lodash");

const isSSR = process.server;

module.exports = {
  getTips: async ({ clients }) => {
    const client = isSSR ? clients.defaultClient : clients.alternativeClient;
    const { data } = await client.query({
      query: TipsQuery
    });

    return get(data, "tips.matches", []);
  }
};
