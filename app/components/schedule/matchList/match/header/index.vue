<template>
  <v-expansion-panel-header class="px-2" :hide-actions="true">
    <v-flex class="my-1">
      <info
        v-bind="{
          league: get(match, 'league.name', ''),
          matchDate: get(match, 'matchDate', ''),
          matchTime: get(match, 'matchTime', ''),
          chl: get(match, 'odds.CHL[0]', {}),
          result: get(match, 'result.corner.full.total', '')
        }"
      />
      <teams
        v-bind="{
          home: get(match, 'homeTeam', {}),
          away: get(match, 'awayTeam', {}),
          FT: get(match, 'result.FT', {})
        }"
      />
      <odds
        v-bind="{
          HAD: get(match, 'odds.HAD[0]', {}),
          HIL: get(match, 'odds.HIL[0]', {}),
          FAKE_HDC: get(match, 'FAKE_HDC.FAKE_HDC', {}),
          HT: get(match, 'result.HT', {})
        }"
      />
    </v-flex>
  </v-expansion-panel-header>
</template>

<script>
import { get } from "lodash";
import Info from "./info";
import Teams from "./teams";
import Odds from "./odds";
export default {
  name: "match-list-match-header",
  components: {
    Info,
    Teams,
    Odds
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  methods: {
    get
  }
};
</script>

<style></style>
