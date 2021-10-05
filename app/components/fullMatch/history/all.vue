<template>
  <div v-if="historyLength > 0">
    <v-card class="mx-auto" max-width="100%" tile>
      <v-list dense>
        <v-list-item-group color="white">
          <template v-for="i in historyLength">
            <v-divider v-if="i > 1" :key="i" />
            <v-list-item
              :inactive="false"
              :key="`history-all-v-list-item__${i}`"
              class="px-0"
            >
              <v-list-item-content class="content pa-0">
                <v-flex class="d-flex col-6 pa-0 ma-0">
                  <half
                    v-if="match.history.home[i - 1]"
                    v-bind="{
                      match: match.history.home[i - 1],
                      teamId: match.homeTeam.teamId,
                      leagueId: match.league.leagueId,
                      right: false
                    }"
                    :key="`matchRow_home_${i - 1}`"
                  />
                </v-flex>
                <v-flex class="d-flex col-6 pa-0 ma-0">
                  <half
                    v-if="match.history.away[i - 1]"
                    v-bind="{
                      match: match.history.away[i - 1],
                      teamId: match.awayTeam.teamId,
                      leagueId: match.league.leagueId,
                      right: true
                    }"
                    :key="`matchRow_home_${i - 1}`"
                  />
                </v-flex>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import get from "lodash/get";
import format from "date-fns/format";
import MatchRow from "./matchRow/index";
import Half from "./half/index";
export default {
  props: {
    match: {
      required: true,
      default: {}
    },
    config: {
      required: true,
      default: {}
    }
  },
  computed: {
    historyLength() {
      return Math.max(
        get(this.match, "history.home", []).length,
        get(this.match, "history.away", []).length
      );
    }
  },
  components: {
    MatchRow,
    Half
  }
};
</script>

<style lang="stylus" scoped>
.content
  height 50px
  > div
    height 100%
</style>
