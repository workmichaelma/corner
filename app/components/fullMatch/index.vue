<template>
  <v-flex>
    <full-match-stat v-bind="{ match }" />
    <v-divider />
    <full-match-teams v-bind="{ match }" />
    <full-match-result v-bind="{ match }" v-if="match.result" />
    <v-divider />
    <full-match-odds v-bind="{ match }" />
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider />
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <full-match-future v-bind="{ match }" />
      </v-tab-item>
      <v-tab-item>
        <full-match-against v-bind="{ match }" />
      </v-tab-item>
      <v-tab-item>
        <full-match-history v-bind="{ match }" />
      </v-tab-item>
    </v-tabs-items>
  </v-flex>
</template>
<script>
import Teams from "./teams";
import Result from "./result";
import Odds from "./odds/index";
import Against from "./against/index";
import Future from "./future/index";
import History from "./history/index";
import Stat from "./Stat/index";
export default {
  components: {
    "full-match-stat": Stat,
    "full-match-against": Against,
    "full-match-future": Future,
    "full-match-teams": Teams,
    "full-match-result": Result,
    "full-match-odds": Odds,
    "full-match-history": History
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  data() {
    return {
      tab: null,
      items: ["賽程", "對賽", "往積"]
    };
  }
};
</script>
<style lang="stylus" scoped></style>
