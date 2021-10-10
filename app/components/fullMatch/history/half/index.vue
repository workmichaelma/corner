<template>
  <v-row class="ma-0" :class="`${right ? 'flex-row-reverse' : ''}`">
    <template v-if="match.isResultValid">
      <!-- <v-col cols="1" class="pa-0 d-flex">
        <corner-count
          v-bind="{
            odds: get(match, 'odds.CHL'),
            count: cornerCount,
            result: get(match, 'result.CHL')
          }"
        />
      </v-col> -->
      <v-col cols="3" class="pa-0 d-flex">
        <CHL
          v-bind="{
            result: get(match, 'result.CHL'),
            odd: get(match, 'odds.CHL[0]', {})
          }"
        />
      </v-col>
      <v-col cols="2" class="pa-0 d-flex">
        <Corner
          v-bind="{
            corner: get(match, 'result.corner.full', {}),
            isHome
          }"
        />
      </v-col>
      <v-col cols="3" class="pa-0 d-flex">
        <Score
          v-bind="{
            result: get(match, 'result'),
            isHome,
            homeTeamId: get(match, 'homeTeam.teamId'),
            awayTeamId: get(match, 'awayTeam.teamId'),
            teamId
          }"
        />
      </v-col>
      <v-col cols="4" class="pa-0 d-flex">
        <HDC
          v-bind="{
            result: get(match, 'result.HDC'),
            odd: get(match, 'odds.HDC[0]', {}),
            FAKE_HDC: get(match, 'FAKE_HDC.FAKE_HDC'),
            isHome
          }"
        />
      </v-col>
      <!-- <v-col cols="2" class="pa-0 d-flex">
        <HIL
          v-bind="{
            result: get(match, 'result.HIL'),
            odd: get(match, 'odds.HIL[0]', {})
          }"
        />
      </v-col> -->
    </template>
  </v-row>
</template>

<script>
import { get } from "lodash";
import Corner from "./cornerCount";
import CHL from "./CHL";
import HIL from "./HIL";
import HDC from "./HDC";
import Score from "./score.vue";

export default {
  name: "half-history",
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
    },
    right: {
      required: false,
      default: false
    }
  },
  components: {
    CHL,
    Corner,
    HIL,
    HDC,
    Score
  },
  computed: {
    cornerCount() {
      return get(this.match, "result.corner.full.total");
    },
    isHome() {
      const homeId = get(this.match, "homeTeam.teamId");
      return homeId === this.teamId;
    }
  },
  methods: {
    get
  }
};
</script>
