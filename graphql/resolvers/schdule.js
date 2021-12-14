const moment = require("moment");
const range = require("lodash/range");
const map = require("lodash/map");
const MatchSchema = require("../mongo/schema/Match");
const { get, reduce } = require("lodash");

const getWeekday = (day) => {
  return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][day];
};

module.exports = {
  Query: {
    schedule: async (obj, args, context, info) => {
      const { ended, page, limit } = args;
      if (ended) {
        const { docs, ...metadata } = await MatchSchema.getEndedMatches({
          page,
          limit,
        });
        return {
          docs,
          metadata,
        };
      } else {
        const { docs, ...metadata } = await MatchSchema.getSchedule({
          page,
          limit,
        });
        return {
          docs,
          metadata,
        };
      }
    },
    scheduleByDate: async (obj, args, context, info) => {
      const { ended, day = 3 } = args;
      let to = ended ? moment() : null;
      let from = ended ? null : moment();
      const orderBy = ended ? -1 : 1;
      if (ended) {
        from = moment(
          moment()
            .subtract(day + 1, "days")
            .format("YYYY-MM-DD")
        );
      } else {
        to = moment(
          moment()
            .add(day + 1, "days")
            .format("YYYY-MM-DD")
        ).hour(23);
      }
      const { docs, ...metadata } = await MatchSchema.getScheduleByDate({
        to,
        from,
        orderBy,
      });

      const matches = reduce(
        docs,
        (obj, match) => {
          if (get(obj, `[${match.day}]`)) {
            obj[match.day].push(match);
          } else {
            obj = {
              ...obj,
              [match.day]: [match],
            };
          }
          return obj;
        },
        {}
      );

      const today = (() => {
        const d = moment().utcOffset("+08:00");

        if (d.format("H") < 12) {
          const _d = moment(d).subtract(1, "days");
          const weekday = getWeekday(moment(_d).day());
          return {
            date: moment(_d).format("DD/MM"),
            fulldate: moment(_d),
            weekday,
            matches: matches[weekday],
          };
        } else {
          return {
            date: moment(d).format("DD/MM"),
            fulldate: moment(_d),
            weekday,
            matches: matches[weekday],
          };
        }
      })();

      const dates = [
        today,
        ...map(range(day - 1), (d) => {
          const i = d + 1;
          if (ended) {
            const date = moment(today.fulldate)
              .utcOffset("+08:00")
              .subtract(i, "days");
            const weekday = getWeekday(moment(date).day());
            return {
              date: date.format("DD/MM"),
              weekday,
              matches: matches[weekday],
            };
          } else {
            const date = moment(today.fulldate)
              .utcOffset("+08:00")
              .add(i, "days");
            const weekday = getWeekday(moment(date).day());
            return {
              date: date.format("DD/MM"),
              weekday: getWeekday(moment(date).day()),
              matches: matches[weekday],
            };
          }
        }),
      ];
      return dates;
    },
  },
};
