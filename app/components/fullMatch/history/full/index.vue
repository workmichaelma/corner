<template>
  <div class="d-flex flex-column" v-if="match.ended && match.isResultValid">
    <Profile
      v-bind="{
        matchDate: match.matchDate,
        leagueName: match.league.name,
        result: match.result
      }"
    />
    <div class="d-flex align-center">
      <Score
        v-bind="{
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          result: match.result,
          teamId
        }"
      />
      <Result v-bind="{ odds: match.odds, result: match.result }" />
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style></style>
