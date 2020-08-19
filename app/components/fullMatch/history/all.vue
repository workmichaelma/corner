<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="100%"
      tile
    >
      <v-list dense>
        <v-list-item-group color="primary">
          <template v-for="i in historyLength">
            <v-list-item :key="i" class="px-0">
              <v-list-item-content class="pa-0">
                <v-flex class="d-flex col-6 pa-0 ma-0">
                  <match-row v-if="match.history.home[i-1]" v-bind="{id: match.history.home[i-1], teamId: match.homeTeam.teamID, half: true}" :key="`matchRow_home_${i-1}`" />
                </v-flex>
                <v-flex class="d-flex col-6 pa-0 ma-0">
                  <match-row v-if="match.history.away[i-1]" v-bind="{id: match.history.away[i-1], teamId: match.awayTeam.teamID, half: true, right: true}" :key="`matchRow_away_${i-1}`" />
                </v-flex>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="i + 1 < historyLength" :key="i" />
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import Match from '~/mixins/match'
import get from 'lodash/get'
import format from 'date-fns/format'
export default {
  mixins: [
    Match
  ],
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
    historyLength () {
      return Math.max(
        get(this.match, 'history.home', []).length,
        get(this.match, 'history.away', []).length
      )
    }
  }
}
</script>
