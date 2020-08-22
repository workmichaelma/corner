<template>
  <v-flex class="d-flex flex-column">
    <v-flex class="d-flex caption">
      <v-flex class="d-flex flex-column col-5 pa-0">
        <team class="team text-center" :class="[color('home', match.homeTeam.teamID)]" v-bind="{name: match.homeTeam.teamName}" />
        <div class="had">
          <div class="odd" v-for="o in noTime(HAD_1)" :key="o">
            {{ o }}
          </div>
        </div>
      </v-flex>
      <v-flex class="d-flex flex-column col-1 pa-0" v-for="t in ['home', 'away']" :key="t">
        <v-flex class="d-flex algin-center justify-center ft" :class="[t, color(t, match[`${t}Team`].teamID)]">
          {{ match.result.FT[t] }}
        </v-flex>
        <v-flex class="d-flex algin-center justify-center ht" :class="[t]">
          {{ match.result.HT[t] }}
        </v-flex>
      </v-flex>
      <v-flex class="d-flex flex-column col-5 pa-0">
        <team class="team text-center" :class="[color('away', match.awayTeam.teamID)]" v-bind="{name: match.awayTeam.teamName}" />
        <div class="hil">
          <div class="odd">
            {{ HIL_1.H }}
          </div>
          <div class="odd">
            {{ HIL_1.LINE }}
          </div>
          <div class="odd">
            {{ HIL_1.L }}
          </div>
        </div>
      </v-flex>
    </v-flex>
  </v-flex>
</template>
<script>
import Team from './team'
import Match from '~/mixins/match'
import get from 'lodash/get'
import format from 'date-fns/format'
export default {
  components: {
    Team
  },
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
.had
.hil
  display grid
  grid-template-columns 1fr 1fr 1fr
  overflow hidden
  > .odd
    transform scale(0.7)
.had
  >.odd
    transform-origin 2px
.hil
  >.odd
    transform-origin 100%
    justify-self end
    &:nth-child(2)
      transform scale(0.85)
.team
  transform scale(0.85) translateY(1px)
  letter-spacing 2px
.ft
  &.home
    transform translateX(2px)
    &:after
      margin-left 2px
      content ':'
  &.away
    transform translateX(-2px)
.ht
  &.home
    transform scale(0.8) translateY(-3px) translateX(3px)
    &:before
      content '('
      margin-right 1px
    &:after
      content '-'
      margin-left 3px
  &.away
    transform scale(0.8) translateY(-3px) translateX(1px)
    &:after
      content ')'
      margin-left 1px
</style>