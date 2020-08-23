<template>
  <v-card
    class="mx-auto"
    max-width="100%"
    tile
  >
    <v-list dense>
      <v-list-item-group color="primary">
        <template v-for="(id, i) in match.history[side]">
          <v-list-item :inactive="false" :key="`history-side-v-list-item__${i}`" class="px-1">
            <v-list-item-content class="pa-0">
              <match-row
                v-bind="{
                  id,
                  teamId,
                  leagueId: match.league.id,
                  config,
                  right: side === 'away'
                }"
                :key="`${id}_${i}`"
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
import Match from '~/mixins/match'
import get from 'lodash/get'
import map from 'lodash/map'
import format from 'date-fns/format'
import MatchRow from './matchRow/index'
export default {
  components: {
    MatchRow
  },
  mixins: [
    Match
  ],
  data () {
    return {
      item: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }
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
      default: 'home'
    }
  },
  computed: {
    left () {
      return this.side === 'home'
    },
    teamId () {
      return get(this, `match.${this.side}Team.teamID`)
    }
  },
}
</script>

<style lang="stylus" scoped>
*
  >>> .v-list-item
    min-height 0 !important
</style>