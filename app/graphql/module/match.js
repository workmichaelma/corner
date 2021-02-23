const MatchQuery = require('../query/match.gql')
const { get } = require('lodash')

const { getMatch } = require('../dummy/match')

module.exports = {
  fetchMatch: async ({client, id}) => {
    // const { data } = await client.query({
    //   query: MatchQuery,
    //   variables: {
    //     id
    //   }
    // })

    const { data } = await getMatch(id)

    return get(data, 'match', [])
  }
}
