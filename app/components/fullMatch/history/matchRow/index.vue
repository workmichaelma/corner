<template>
  <v-flex
    class="`match-row d-flex ma-0`"
    :class="{ half, right, [`flex-row${right && '-reverse'}`]: true }"
    @dblclick="toggleOverlay()"
  >
    <!-- 角球數 -->
    <corner-count
      v-bind="{
        count: get(match, 'result.corner.full.total'),
        result: get(match, 'result.CHL.latest'),
        right,
      }"
      class="corner-count flex-grow-0 flex-shrink-0"
    />
    <!-- 角球數 -->
    <v-divider vertical inset />
    <!-- 主要賠率及結果 -->
    <odds
      v-bind="{
        dateDiff: match.dateDiff || 10,
        odds: get(match, 'odds'),
        result: get(match, 'result'),
        reverse: right,
        side
      }"
      class="flex-grow-1"
    />
    <!-- 主要賠率及結果 -->

    <Profile v-if="!half" v-bind="{match, teamId, leagueId}" />
    <!-- <keep-alive>
      <template v-if="!half">
        <match-profile v-bind="{ match, teamId, leagueId, }" v-show="!half" />
      </template>
    </keep-alive> -->
    <overlay
      v-bind="{
        show: showOverlay && !half,
        url: `/match/${match.id}`,
        toggleOverlay,
      }"
    />
  </v-flex>
</template>
<script>
import CornerCount from "./cornerCount";
import DateHHA from "./date_HHA";
import Odds from './odds'
import Overlay from './overlay'
import Profile from './Profile'
// import Match from "~/mixins/match";
import get from "lodash/get";
import isObject from "lodash/isObject";
import format from "date-fns/format";
export default {
  // mixins: [Match],
  data() {
    return {
      showOverlay: false,
    };
  },
  props: {
    match: {
      required: true,
      default: {},
    },
    leagueId: {
      required: true,
      default: "",
    },
    teamId: {
      required: true,
      default: "",
    },
    half: {
      required: false,
      default: false,
    },
    right: {
      required: false,
      default: false,
    },
    config: {
      required: true,
      default: {
        showSameSide: false,
        showSameLeague: false,
        showSimilarOdd: false,
        oddsRange: null,
      },
    },
  },
  computed: {
    side() {
      const homeId = get(this, "match.homeTeam.teamId");
      return homeId === this.teamId ? "home" : "away";
    },
  },
  methods: {
    get,
    toggleOverlay() {
      console.log({o: this.showOverlay})
      this.showOverlay = !this.showOverlay;
    },
  },
  components: {
    CornerCount,
    "date-hha": DateHHA,
    Odds,
    Overlay,
    Profile,
  },
};
</script>

<style lang="stylus" scoped>
.match-row {
  // display: grid;
  width: 100%;
  max-width: 100%;
  // grid-template-columns: 40px 1px minmax(0, 1fr) 1px 40px 50%;

  // &.half {
    // grid-template-columns: 30px 1px minmax(0, 1fr);
    // grid-template-columns: 40px 1px minmax(0, 1fr) 1px 40px;
  // }

  // &.right {
  //   grid-template-columns: 50% 40px 1px minmax(0, 1fr) 1px 40px;

  //   &.half {
  //     grid-template-columns: 40px 1px minmax(0, 1fr) 1px 40px;
  //   }

  //   for num in 1...6 {
  //     > *:nth-child({num}) {
  //       order: 7 - num;
  //     }
  //   }
  // }

}
.corner-count
  width 30px
  flex-basis 30px
</style>