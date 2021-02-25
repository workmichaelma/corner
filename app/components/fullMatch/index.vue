<template>
  <div>
    <full-match-profile v-bind="{ match }" />
    <v-divider />
    <full-match-teams v-bind="{ match }" />
    <full-match-result v-bind="{ match }" v-if="match.result" />
    <v-divider />
    <full-match-odds v-bind="{ match }" />
    <v-divider />
    <full-match-history v-bind="{ match }" />
  </div>
</template>
<script>
import Teams from "./teams";
import Profile from "./profile";
import Result from "./result";
import Odds from "./odds/index";
import History from "./history/index";
export default {
  components: {
    "full-match-profile": Profile,
    "full-match-teams": Teams,
    "full-match-result": Result,
    "full-match-odds": Odds,
    "full-match-history": History,
  },
  props: {
    match: {
      required: true,
      default: {},
    },
  },
};
</script>
<style lang="stylus" scoped></style>