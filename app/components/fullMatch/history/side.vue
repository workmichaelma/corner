<template>
  <v-card class="mx-auto" max-width="100%" tile>
    <v-list dense>
      <v-list-item-group color="white">
        <template v-for="(m, i) in matches">
          <v-list-item
            :inactive="false"
            :key="`history-side-v-list-item__${i}`"
            class="px-0"
          >
            <v-list-item-content class="content pa-0 py-1">
              <Full
                v-bind="{
                  match: m,
                  teamId: match[`${side}Team`].teamId
                }"
              />
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="i + 1 < match.history[side].length" :key="i" />
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { isObject, get, reduce } from "lodash";
import MatchRow from "./matchRow/index";
import Full from "./full/index";
export default {
  components: {
    MatchRow,
    Full
  },
  props: {
    match: {
      required: true,
      default: {}
    },
    config: {
      required: true,
      default: {}
    },
    side: {
      required: true,
      default: "home"
    }
  },
  computed: {
    left() {
      return this.side === "home";
    },
    teamId() {
      return get(this, `match.${this.side}Team.teamId`);
    },
    leagueId() {
      return get(this, "match.league.leagueId");
    },
    showSameLeague() {
      return get(this.config, "showSameLeague", false);
    },
    showSameSide() {
      return get(this.config, "showSameSide", false);
    },
    showSimilarOdd() {
      return get(this.config, "showSimilarOdd", false);
    },
    oddsRange() {
      return get(this.config, "oddsRange", {});
    },
    matches() {
      return reduce(
        this.match.history[this.side],
        (arr, m) => {
          let exposed = true;
          if (this.showSameSide) {
            exposed = this.teamId === get(m, `${this.side}Team.teamId`);
          }
          if (this.showSameLeague && exposed) {
            exposed = this.leagueId === get(m, "league.leagueId");
          }
          if (this.showSimilarOdd && exposed) {
            const HDC = get(this, "match.FAKE_HDC.FAKE_HDC.value");
            if (HDC) {
              exposed = HDC === get(m, "FAKE_HDC.FAKE_HDC.value");
            }
          }
          // if (isObject(this.oddsRange) && exposed) {
          //   const { min, max } = this.oddsRange || {};
          //   const HAD = get(m, "odds.HAD[0].H");
          //   exposed = HAD >= min && HAD <= max;
          // }
          if (exposed && m.result) {
            arr.push(m);
          }
          return arr;
        },
        []
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
// *
//   >>> .v-list-item
//     min-height 0 !important
.content
  min-height 50px
  > div
    height 100%
</style>
