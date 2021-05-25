<template>
  <div class="d-flex text-center">
    <div
      class="d-flex"
      :class="
        getTeamResultcolorBySide(HAD, 'home', teamId, get(homeTeam, 'teamId'))
      "
    >
      <div class="rank">{{ homeTeam.rank }}</div>
      <div class="team">
        {{ homeTeam.teamName }}
      </div>
    </div>
    <div class="score d-flex">
      <div class="score-FT">
        <data
          :class="
            getTeamResultcolorBySide(
              HAD,
              'home',
              teamId,
              get(homeTeam, 'teamId')
            )
          "
        >
          {{ result.FT.home }}
        </data>
        <data>-</data>
        <data
          :class="
            getTeamResultcolorBySide(
              HAD,
              'away',
              teamId,
              get(awayTeam, 'teamId')
            )
          "
        >
          {{ result.FT.away }}
        </data>
      </div>
      <div class="score-HT">({{ result.HT.home }}-{{ result.HT.away }})</div>
    </div>
    <div
      class="d-flex"
      :class="
        getTeamResultcolorBySide(HAD, 'away', teamId, get(awayTeam, 'teamId'))
      "
    >
      <div class="team">
        {{ awayTeam.teamName }}
      </div>
      <div class="rank">{{ awayTeam.rank }}</div>
    </div>
  </div>
</template>

<script>
import get from "lodash/get";
import { getTeamResultcolorBySide } from "~/utils";
export default {
  name: "full-history-score",
  props: {
    homeTeam: {
      default: {},
      required: true
    },
    awayTeam: {
      default: {},
      required: true
    },
    result: {
      default: {},
      required: true
    },
    teamId: {
      default: "",
      required: true
    }
  },
  methods: {
    get,
    getTeamResultcolorBySide
  },
  computed: {
    HAD() {
      return get(this.result, "HAD");
    }
  }
};
</script>

<style lang="stylus" scoped>
.score
  padding 0 2px

.score-FT
  display inline-block
  transform scale(0.9)
  transform-origin center center
  width 35px

.score-HT
  display inline-block
  transform scale(0.8)
  transform-origin center center
  width 35px

.rank
  width 20px
  font-weight bold

.team
  width 47px
  white-space nowrap
  overflow hidden

.rank
  display inline-block
  transform scale(0.8)
  transform-origin center center
</style>
