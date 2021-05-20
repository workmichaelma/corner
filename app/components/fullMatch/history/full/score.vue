<template>
  <div class="d-flex text-center">
    <div
      class="team"
      :class="
        getTeamResultcolorBySide(HAD, 'home', teamId, get(homeTeam, 'teamId'))
      "
    >
      <span class="rank">[{{ homeTeam.rank }}]</span>{{ homeTeam.teamName }}
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
      class="team"
      :class="
        getTeamResultcolorBySide(HAD, 'away', teamId, get(awayTeam, 'teamId'))
      "
    >
      <span class="rank">[{{ awayTeam.rank }}]</span>{{ awayTeam.teamName }}
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

<style lang="stylus">
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

.team
  width 67px
  white-space nowrap
  overflow hidden

.rank
  display inline-block
  transform scale(0.8)
  transform-origin center center
</style>
