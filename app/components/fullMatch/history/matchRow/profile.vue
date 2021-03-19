<template>
  <v-flex class="profile d-flex flex-row flex-grow-0">
    <v-flex class="d-flex flex-column justify-space-between">
      <v-flex class="d-flex text-center league">
        {{ get(match, "league.name", "") }}
      </v-flex>
      <v-flex
        :class="getHADColor(get(match, 'homeTeam.teamId'), 'H')"
        class="d-flex align-center"
      >
        {{ get(match, "homeTeam.teamName") }}
      </v-flex>
      <v-flex
        :class="getHADColor(get(match, 'awayTeam.teamId'), 'A')"
        class="d-flex align-center"
      >
        {{ get(match, "awayTeam.teamName") }}
      </v-flex>
    </v-flex>
    <v-flex class="d-flex flex-column justify-space-between text-center">
      <v-flex class="d-flex justify-center align-center">
        入球
      </v-flex>
      <v-flex class="d-flex justify-center align-center">
        {{ get(match, "result.FT.home") }}
        <span class="pl-1">[ {{ get(match, "result.HT.home") }} ]</span>
      </v-flex>
      <v-flex class="d-flex justify-center align-center">
        {{ get(match, "result.FT.away") }}
        <span class="pl-1">[ {{ get(match, "result.HT.away") }} ]</span>
      </v-flex>
    </v-flex>
    <v-flex class="d-flex flex-column justify-space-between text-center">
      <v-flex class="d-flex justify-center align-center">
        角球
      </v-flex>
      <v-flex class="d-flex justify-center align-center">
        <template v-if="get(match, 'result.corner.full.home')">
          {{ get(match, "result.corner.full.home") }}
          <span class="pl-1"
            >[ {{ get(match, "result.corner.half.home") }} ]</span
          >
        </template>
        <template v-else>
          -
        </template>
      </v-flex>
      <v-flex class="d-flex justify-center align-center">
        <template v-if="get(match, 'result.corner.full.away')">
          {{ get(match, "result.corner.full.away") }}
          <span class="pl-1"
            >[ {{ get(match, "result.corner.half.away") }} ]</span
          >
        </template>
        <template v-else>
          -
        </template>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import { get } from "lodash";
import { getTeamResultColor } from "~/utils";

export default {
  props: {
    match: {
      required: true,
      default: {}
    },
    teamId: {
      required: true,
      default: ""
    },
    leagueId: {
      required: true,
      default: ""
    }
  },
  methods: {
    get,
    getHADColor(id, side) {
      const HAD = get(this, "match.result.HAD");
      if (HAD === "D") {
        return getTeamResultColor("和");
      }
      let result = "";
      if (this.teamId === id) {
        switch (side) {
          case "H":
            result = HAD === "H" ? "羸" : HAD === "A" ? "輸" : "和";
            break;
          case "A":
            result = HAD === "H" ? "輸" : HAD === "A" ? "羸" : "和";
            break;
        }
      }
      if (result) {
        return getTeamResultColor(result);
      }

      return "";
    }
  }
};
</script>

<style lang="stylus" scoped>
.profile
  font-size xx-small
  line-height 12px
  width 50%
  flex-basis 50%

.league
  transform scale(0.8)

span
  font-size xx-small
  line-height 12px
</style>
