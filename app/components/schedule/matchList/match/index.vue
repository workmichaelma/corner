<template>
  <v-flex class="py-1 px-2  grey darken-4" @click="redirect()">
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
</template>
<script>
import { get } from "lodash";
import Info from "./info";
import Teams from "./teams";
import Odds from "./odds";
export default {
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  components: {
    Info,
    Teams,
    Odds
  },
  methods: {
    get,
    redirect() {
      this.$router.push(`/match/${this.match.id}`);
    }
  }
};
</script>
<style lang="stylus" scoped>
.panel
  >>> button
    padding 0
</style>
