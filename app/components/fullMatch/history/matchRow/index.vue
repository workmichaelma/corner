<template>
  <div class="match-row ma-0" :class="{half, right}">
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
    }
  },
  computed: {
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
  &.right
    for num in 1...6
      > *:nth-child({num})
        order 7 - num

</style>