<template>
  <div class="match-row ma-0" :class="{half, right}" v-if="exposed">
    <!-- 角球數 -->
    <corner-count v-bind="{ count: get(match, 'result.corner') }" />
    <!-- 角球數 -->
    <v-divider vertical inset />
    <!-- 角球球數及結果 -->
    <corner-result v-bind="{ H: CHL_1.H, L: CHL_1.L, LINE: CHL_1.LINE, result: get(match, 'result.CHL') }" />
    <!-- 角球球數及結果 -->
    <v-divider vertical inset />
    <!--日期及讓盤-->
    <date-hha v-bind="{dateDiff: match.dateDiff, HHA: side === 'home' ? `主${HHA_1.HG}` : `客${HHA_1.AG}`}" />
    <!--日期及讓盤-->

    <keep-alive>
      <template v-if="!half">
        <match-profile v-bind="{match, teamId}" v-show="!half" />
      </template>
    </keep-alive>
  </div>
</template>
<script>
import Match from '~/mixins/match'
import get from 'lodash/get'
import isObject from 'lodash/isObject'
import format from 'date-fns/format'
export default {
  mixins: [
    Match
  ],
  props: {
    id: {
      required: true,
      default: ''
    },
    leagueId: {
      required: true,
      default: ''
    },
    teamId: {
      required: true,
      default: ''
    },
    half: {
      required: false,
      default: false
    },
    right: {
      required: false,
      default: false
    },
    config: {
      required: true,
      default: {
        showSameSide: false,
        showSameLeague: false,
        showSimilarOdd: false,
        oddsRange: null
      }
    }
  },
  computed: {
    exposed () {
      let exposed = true
      if (this.config.showSameSide) {
        const side = this.right ? 'away' : 'home'
        exposed = this.teamId === get(this.match, `${side}Team.teamID`)
      }
      if (this.config.showSameLeague) {
        exposed = this.leagueId === get(this.match, 'league.id')
      }
      if (isObject(this.config.oddsRange)) {
        const { min, max } = this.config.oddsRange || {}
        exposed = this.HAD_1.H >= min && this.HAD_1.H <= max
      }
      return exposed
    },
    match () {
      return this.$store.state.match[this.id] || {}
    },
    side () {
      const homeId = get(this, 'match.homeTeam.teamID')
      return homeId === this.teamId ? 'home' : 'away'
    }
  },
  methods: {
    get
  }
}
</script>

<style lang="stylus" scoped>
.match-row
  display grid
  width 100%
  max-width 100%
  grid-template-columns 40px 1px minmax(0, 1fr) 1px 40px 50%
  &.half
    grid-template-columns 40px 1px minmax(0, 1fr) 1px 40px
  &.right
    grid-template-columns 50% 40px 1px minmax(0, 1fr) 1px 40px
    &.half
      grid-template-columns 40px 1px minmax(0, 1fr) 1px 40px
    for num in 1...6
      > *:nth-child({num})
        order 7 - num

</style>