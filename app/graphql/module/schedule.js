const ScheduleQuery = require('../query/schedule.graphql')
const MatchQuery = require('../query/match.gql')
const { get } = require('lodash')

const { getUpcomingSchedule, getEndedSchedule } = require('../dummy/schedule')

module.exports = {
  getSchedule: async ({client, ended}) => {
    // const { data } = await client.query({
    //   query: ScheduleQuery,
    //   variables: {
    //     ended
    //   }
    // })

    const { data } = ended ? await getEndedSchedule() : await getUpcomingSchedule()

    return get(data, 'schedule', [])
  }
}
