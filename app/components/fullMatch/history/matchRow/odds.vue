<template>
  <v-flex
    class="odds d-flex flex-column justify-center px-1 text-center accent-1"
  >
    <v-flex :class="`d-flex ${flexRowString} pt-1`">
      <v-flex
        class="d-flex align-center justify-center"
        :class="
          side === 'home' && teamResult !== '和'
            ? getTeamResultColor(teamResult)
            : ''
        "
      >
        {{ HAD[side === "home" ? "H" : "A"] }}
      </v-flex>
      <v-flex :class="`d-flex align-center justify-center ${flexRowString}`">
        <div>{{ side === "home" ? "主" : "客" }}</div>
        <div class="score">
          [
          {{ `${get(result, "FT.home", "")} : ${get(result, "FT.away", "")}` }}
          ]
        </div>
        <div :class="getTeamResultColor(teamResult)">{{ teamResult }}</div>
      </v-flex>
      <v-flex
        class="d-flex align-center justify-center"
        :class="
          side === 'away' && teamResult !== '和'
            ? getTeamResultColor(teamResult)
            : ''
        "
      >
        {{ HAD[side === "home" ? "A" : "H"] }}
      </v-flex>
      <v-flex
        class="d-flex align-center justify-space-around dateDiff flex-grow-0 flex-shrink-0"
      >
        {{ dateDiff }}
        <!-- <v-icon size="10">mdi-calendar-check</v-icon> -->
      </v-flex>
    </v-flex>
    <v-flex :class="`d-flex ${flexRowString}`">
      <v-flex class="bot d-flex flex-row">
        <v-flex
          class="d-flex align-center justify-center"
          :class="getColor('H', get(result, 'CHL.latest'))"
        >
          {{ CHL.H }}
        </v-flex>
        <v-flex
          class="d-flex align-center justify-center font-weight-bold caption"
        >
          {{ CHL.LINE }}
        </v-flex>
        <v-flex
          class="d-flex align-center justify-center"
          :class="getColor('L', get(result, 'CHL.latest'))"
        >
          {{ CHL.L }}
        </v-flex>
      </v-flex>
      <v-flex class="d-flex align-center" v-if="!isEmpty(CHL)">
        ．
      </v-flex>
      <v-flex class="bot d-flex flex-row" v-if="!isEmpty(HIL)">
        <v-flex
          class="d-flex align-center justify-center"
          :class="getColor('H', get(result, 'HIL.latest'))"
        >
          {{ HIL.H }}
        </v-flex>
        <v-flex
          class="d-flex align-center justify-center font-weight-bold caption"
        >
          {{ HIL.LINE }}
        </v-flex>
        <v-flex
          class="d-flex align-center justify-center"
          :class="getColor('L', get(result, 'HIL.latest'))"
        >
          {{ HIL.L }}
        </v-flex>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import { get, isEmpty } from "lodash";
import { getTeamResultColor } from "~/utils";
export default {
  props: {
    dateDiff: {
      required: true,
      default: ""
    },
    odds: {
      required: true,
      default: {}
    },
    result: {
      required: true,
      default: {}
    },
    reverse: {
      required: true,
      default: false
    },
    side: {
      required: true,
      default: ""
    }
  },
  computed: {
    HAD() {
      return get(this.odds, "HAD[0]", {});
    },
    HIL() {
      return get(this.odds, "HIL[0]", {});
    },
    CHL() {
      return get(this.odds, "CHL[0]", {});
    },
    flexRowString() {
      return `flex-row${this.reverse ? "-reverse" : ""}`;
    },
    teamResult() {
      switch (this.result.HAD) {
        case "H":
          return this.side === "home" ? "羸" : "輸";
        case "A":
          return this.side === "away" ? "羸" : "輸";
        default:
          return "和";
      }
    }
  },
  methods: {
    get,
    getColor(self, result) {
      return `${self === result ? "lime" : "grey"}--text`;
    },
    getTeamResultColor,
    isEmpty
  }
};
</script>

<style lang="stylus" scoped>
.odds
  font-size xx-small
  line-height 12px

.bot
  flex-basis 50%
  width 50%

.dateDiff
  width 20px
  flex-basis 20px

.score
  margin 0 2px
</style>
