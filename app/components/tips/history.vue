<template>
  <v-flex class="">
    <v-flex class="d-flex mb-2">
      <v-flex class="text-right mr-1"> {{ match.league.name }} </v-flex>
      <v-flex class="text-left ml-1"> {{ days }}日前 </v-flex>
      <v-flex
        class="text-right ml-1"
        v-if="CHLresult"
        :class="[
          CHLresult ? getTeamResultColor(CHLresult === 'H' ? '羸' : '輸') : ''
        ]"
      >
        {{ match.odds.CHL[0].LINE }}{{ CHLresult === "H" ? "大" : "細" }}
      </v-flex>
    </v-flex>
    <v-flex class="d-flex" :class="{ 'flex-row-reverse': side === 'home' }">
      <v-flex
        class="d-flex align-center justify-center"
        :class="{ 'flex-row-reverse': side === 'home' }"
      >
        <v-flex class="text-caption flex-grow-0">[{{ team.rank }}]</v-flex>
        <v-flex class="flex-grow-0 mx-1">{{
          team.teamName.substr(0, 5)
        }}</v-flex>
      </v-flex>
      <v-flex class="d-flex align-center">
        <template v-if="get(match, 'result.corner.half.home', -1) > -1">
          <v-flex
            class=""
            v-if="
              get(match, 'result.corner.full.home', -1) > -1 &&
                get(match, 'result.corner.full.away', -1) > -1
            "
            >{{ match.result.corner.full.home }} -
            {{ match.result.corner.full.away }}</v-flex
          >
          <v-flex
            class="text-caption"
            v-if="
              get(match, 'result.corner.half.home', -1) > -1 &&
                get(match, 'result.corner.half.away', -1) > -1
            "
            >({{ match.result.corner.half.home }} -
            {{ match.result.corner.half.away }})</v-flex
          >
        </template>
        <template v-else-if="get(match, 'result.corner.full.total', -1) > -1">
          {{ match.result.corner.full.total }}
        </template>
      </v-flex>
    </v-flex>
    <v-divider class="my-3" />
  </v-flex>
</template>

<script>
import get from "lodash/get";
import take from "lodash/take";
import moment from "moment";

import { getTeamResultColor } from "~/utils";
export default {
  name: "tips-history",
  props: {
    match: {
      required: true,
      default: {}
    },
    datetime: {
      required: true,
      default: ""
    },
    side: {
      required: true,
      default: "home"
    }
  },
  computed: {
    days() {
      return moment(this.matchDatetime).diff(
        moment(this.match.matchDatetime),
        "days"
      );
    },
    oppo() {
      return this.side === "home" ? "away" : "home";
    },
    team() {
      return this.match[`${this.oppo}Team`];
    },
    CHLresult() {
      return get(this, "match.result.CHL.first");
    }
  },
  methods: {
    get,
    take,
    getTeamResultColor
  }
};
</script>

<style></style>
