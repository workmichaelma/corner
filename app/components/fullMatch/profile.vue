<template>
  <v-flex
    id="match__profile"
    class="d-flex col-12 justify-space-between align-center pt-0"
  >
    <div>
      {{ get(match, "matchDatetime", "") }}
    </div>
    <div>
      {{ get(match, "league.name", "") }}
    </div>
  </v-flex>
</template>
<script>
import Match from "~/mixins/match";
import { get } from "lodash";
export default {
  mixins: [Match],
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
