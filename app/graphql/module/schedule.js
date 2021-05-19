const ScheduleQuery = require("../query/schedule.graphql");
const MatchQuery = require("../query/match.gql");
const { get } = require("lodash");

const { getUpcomingSchedule, getEndedSchedule } = require("../dummy/schedule");

const isSSR = process.server;

module.exports = {
  getSchedule: async ({ clients, ended, limit }) => {
    const client = isSSR ? clients.defaultClient : clients.alternativeClient;
    const { data } = await client.query({
      query: ScheduleQuery,
      variables: {
        ended,
        limit
      }
    });
    // const { data } = ended
    //   ? await getEndedSchedule()
    //   : await getUpcomingSchedule();

    // return get(data, "schedule.docs", []);
    return get(data, "schedule.docs", []);
  }
};
