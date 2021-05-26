<template>
  <v-card>
    <v-tabs v-model="tab" dark centered>
      <v-tab v-for="(_, t) in team" :key="t">
        {{ _.teamName }} [{{ _.rank }}]
      </v-tab>
    </v-tabs>

    <v-flex class="option justify-center" py-1>
      <v-switch
        v-model="showSameSide"
        label="只顯示同主客"
        dense
        inset
        hide-details
      />
    </v-flex>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(_, t) in team" :key="t">
        <v-card flat>
          <Rank
            v-bind="{
              matches: history[t],
              teamId: match[`${t}Team`].teamId
            }"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { compact, get, map } from "lodash";
import Rank from "./rank";
export default {
  name: "full-match-stat",
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  components: {
    Rank
  },
  computed: {
    team() {
      return {
        home: get(this.match, "homeTeam", {}),
        away: get(this.match, "awayTeam", {})
      };
    },
    history() {
      const home = get(this.match, "history.home", []);
      const away = get(this.match, "history.away", []);
      return {
        home: this.showSameSide
          ? compact(
              map(home, m => {
                return get(this.team, "home.teamId") ===
                  get(m, `homeTeam.teamId`)
                  ? m
                  : false;
              })
            )
          : home,
        away: this.showSameSide
          ? compact(
              map(away, m => {
                return get(this.team, "away.teamId") ===
                  get(m, `awayTeam.teamId`)
                  ? m
                  : false;
              })
            )
          : away
      };
    }
  },
  data() {
    return {
      tab: "home",
      showSameSide: false
    };
  }
};
</script>

<style lang="stylus" scoped>
.option
  transform scale(0.7)
  > .v-input
    margin 0
</style>
