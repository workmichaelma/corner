<template>
  <div>
    <Row v-bind="{ ...row1 }" />
    <Row v-bind="{ ...row3 }" />
    <Row v-bind="{ ...row2 }" />
    <Row v-bind="{ ...row4 }" />
  </div>
</template>

<script>
import { get, mean, reduce, round } from "lodash";
import Row from "./row";
export default {
  name: "full-match-stat-rank",
  components: {
    Row
  },
  props: {
    matches: {
      required: true,
      default: []
    },
    teamId: {
      required: true,
      default: ""
    }
  },
  methods: {
    getTeamsRank(match) {
      const { homeTeam, awayTeam } = match || {};
      if (homeTeam.rank && awayTeam.rank) {
        const isHome = homeTeam.teamId === this.teamId;
        const side = isHome ? "home" : "away";
        const teamRank = {
          self: isHome ? homeTeam.rank : awayTeam.rank,
          oppo: !isHome ? homeTeam.rank : awayTeam.rank
        };
        const isUpper = ~~teamRank.self < ~~teamRank.oppo;
        const result = get(match, "result.CHL", null);
        const corner = {
          FT: get(match, `result.corner.full[${side}]`),
          HT: get(match, `result.corner.half[${side}]`)
        };
        return {
          isUpper,
          result,
          corner,
          side
        };
      }
      return {};
    }
  },
  computed: {
    row1() {
      return {
        left1: `${round(
          (this.stat.up.H / (this.stat.up.H + this.stat.up.L)) * 100
        )}%`,
        left2: `${this.stat.up.H}次 大`,
        mid: "對較高排名",
        right1: `${round(
          (this.stat.up.L / (this.stat.up.H + this.stat.up.L)) * 100
        )}%`,
        right2: `${this.stat.up.L}次 細`
      };
    },
    row2() {
      return {
        left1: `${round(
          (this.stat.down.H / (this.stat.down.H + this.stat.down.L)) * 100
        )}%`,
        left2: `${this.stat.down.H}次 大`,
        mid: "對較低排名",
        right1: `${round(
          (this.stat.down.L / (this.stat.down.H + this.stat.down.L)) * 100
        )}%`,
        right2: `${this.stat.down.L}次 細`
      };
    },
    row3() {
      return {
        left1: `[${round(mean(this.count.up.HT), 1)}]個`,
        left2: "半場",
        mid: "對較高排名平均",
        right1: `${round(mean(this.count.up.FT), 1)}個`,
        right2: "全場"
      };
    },
    row4() {
      return {
        left1: `[${round(mean(this.count.down.HT), 1)}]個`,
        left2: "半場",
        mid: "對較低排名平均",
        right1: `${round(mean(this.count.down.FT), 1)}個`,
        right2: "全場"
      };
    },
    stat() {
      const s = reduce(
        this.matches,
        (stat, m) => {
          const { isUpper, result } = this.getTeamsRank(m);

          if (result === "H" || result === "L") {
            return {
              up: {
                H: isUpper && result === "H" ? stat.up.H + 1 : stat.up.H,
                L: isUpper && result === "L" ? stat.up.L + 1 : stat.up.L
              },
              down: {
                H: !isUpper && result === "H" ? stat.down.H + 1 : stat.down.H,
                L: !isUpper && result === "L" ? stat.down.L + 1 : stat.down.L
              }
            };
          }
          return stat;
        },
        {
          up: {
            H: 0,
            L: 0
          },
          down: {
            H: 0,
            L: 0
          }
        }
      );
      return s;
    },
    count() {
      const s = reduce(
        this.matches,
        (stat, m) => {
          const { isUpper, corner } = this.getTeamsRank(m);
          const { FT = -1, HT = -1 } = corner || {};

          if (FT > -1 && HT > -1) {
            return {
              up: {
                HT: isUpper ? [...stat.up.HT, HT] : stat.up.HT,
                FT: isUpper ? [...stat.up.FT, FT] : stat.up.FT
              },
              down: {
                HT: !isUpper ? [...stat.down.HT, HT] : stat.down.HT,
                FT: !isUpper ? [...stat.down.FT, FT] : stat.down.FT
              }
            };
          }
          return stat;
        },
        {
          up: {
            HT: [],
            FT: []
          },
          down: {
            HT: [],
            FT: []
          }
        }
      );
      return s;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
