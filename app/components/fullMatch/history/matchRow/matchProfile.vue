<template>
  <v-flex class="d-flex flex-column">
    <v-flex class="d-flex caption" v-for="t in ['home', 'away']" :key="`match_profile_${t}`">
      <v-flex class="d-flex team col-10 pa-0 justify-end" :class="[color(t, match[`${t}Team`].teamID)]">
        {{ match[`${t}Team`].teamName }}
      </v-flex>
      <v-flex class="d-flex col-1 pa-0 body-2 align-center justify-center">
        {{ match.result.FT[t]}}
      </v-flex>
      <v-flex class="d-flex col-1 pa-0 ht justify-center">
        {{ match.result.HT[t]}}
      </v-flex>
    </v-flex>
  </v-flex>
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
    },
    teamId: {
      required: true,
      default: ''
    }
  },
  computed: {
    HAD () {
      return get(this.match, 'result.HAD')
    }
  },
  methods: {
    color (side, id) {
      if (this.teamId === id) {
        if (this.HAD === 'D') return 'light-blue--text darken-1'
        if (this.HAD === 'H') {
          return side === 'home' ? 'red--text darken-3' : 'green--text darken-1'
        }
        if (this.HAD === 'A') {
          return side === 'away' ? 'red--text darken-3' : 'green--text darken-1'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.team
  transform scale(0.85) translateY(1px)
  letter-spacing 2px
.ht
  transform scale(0.8) translateY(1px)
</style>