<template>
  <v-flex
    class="odd-wrapper d-flex"
    :class="`${right ? 'flex-row-reverse' : ''}`"
  >
    <corner-count
      v-bind="{
        count,
        result: get(result, 'CHL')
      }"
    />
    <chl
      v-bind="{
        odd: get(match, 'odds.CHL[0]'),
        result: get(result, 'CHL')
      }"
    />
    <had
      v-bind="{
        odd: get(match, 'odds.HAD[0]'),
        result: get(result, 'HAD'),
        isHome
      }"
    />
    <hil
      v-bind="{
        odd: get(match, 'odds.HIL[0]'),
        result: get(result, 'HIL')
      }"
    />
    <side
      v-bind="{
        isHome,
        result: get(result, 'HAD')
      }"
    />
  </v-flex>
</template>

<script>
import { get } from "lodash";
import CornerCount from "./cornerCount";
import CHL from "./CHL";
import HAD from "./HAD";
import HIL from "./HIL";
import side from "./side";
export default {
  name: "match-odds",
  props: {
    count: {
      required: false,
      default: -1
    },
    result: {
      required: true,
      default: {}
    },
    right: {
      required: true,
      default: true
    },
    match: {
      required: true,
      default: {}
    },
    teamId: {
      required: true,
      default: ""
    }
  },
  components: {
    CornerCount,
    chl: CHL,
    had: HAD,
    hil: HIL,
    side
  },
  computed: {
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

<style lang="stylus" scoped>
.odd-wrapper
  width 50%
  flex-basis 50%
</style>
