<template>
  <div class="d-flex flex-column">
    <Profile
      v-bind="{
        matchDate: match.matchDate,
        leagueName: match.league.name
      }"
    />
    <div class="d-flex align-center justify-center">
      <Score
        v-bind="{
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          result: match.result,
          teamId
        }"
      />
      <Result v-bind="{ odds: match.odds, result: match.result }" />
      <Corner v-bind="{ result: match.result }" />
    </div>
  </div>
</template>

<script>
import Corner from "./corner";
import Profile from "./profile";
import Result from "./result/index";
import Score from "./score";
export default {
  name: "full-history",
  components: {
    Corner,
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
  }
};
</script>

<style></style>
