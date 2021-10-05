<template>
  <div class="" v-if="match.ended && match.isResultValid">
    <v-row class="ma-0 flex-row">
      <v-col cols="7" class="d-flex flex-column pa-0">
        <Profile
          v-bind="{
            matchDate: match.matchDate,
            leagueName: match.league.name,
            result: match.result
          }"
        />
        <Score
          v-bind="{
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            result: match.result,
            teamId
          }"
        />
      </v-col>
      <v-col cols="5" class="pa-0">
        <Result
          v-bind="{
            odds: match.odds,
            result: match.result,
            isHome,
            FAKE_HDC: match.FAKE_HDC.FAKE_HDC
          }"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { get } from "lodash";
import Profile from "./profile";
import Result from "./result/index";
import Score from "./score";
export default {
  name: "full-history",
  components: {
    Profile,
    Result,
    Score
  },
  props: {
    match: {
      default: {},
      required: true
    },
    teamId: {
      default: "",
      required: true
    }
  },
  computed: {
    isHome() {
      const homeId = get(this.match, "homeTeam.teamId");
      return homeId === this.teamId;
    }
  }
};
</script>

<style></style>
