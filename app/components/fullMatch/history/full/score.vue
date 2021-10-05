<template>
  <v-row class="d-flex text-center flex-grow-1 px-1 py-0 ma-0">
    <v-col
      class="d-flex pa-0 ma-0 align-center justify-between"
      cols="4"
      :class="
        getTeamResultcolorBySide(HAD, 'home', teamId, get(homeTeam, 'teamId'))
      "
    >
      <v-flex class="rank">{{ homeTeam.rank }}</v-flex>
      <v-flex class="team flex-grow-1">
        {{ homeTeam.teamName }}
      </v-flex>
    </v-col>
    <v-col cols="4" class="score d-flex pa-0 justify-center align-center">
      <v-flex class="d-flex justify-end score-FT">
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
      </v-flex>
      <v-flex class="score-HT"
        >({{ result.HT.home }}-{{ result.HT.away }})</v-flex
      >
    </v-col>
    <v-col
      cols="4"
      class="d-flex pa-0 ma-0 align-center justify-between"
      :class="
        getTeamResultcolorBySide(HAD, 'away', teamId, get(awayTeam, 'teamId'))
      "
    >
      <div class="team flex-grow-1">
        {{ awayTeam.teamName }}
      </div>
      <div class="rank">{{ awayTeam.rank }}</div>
    </v-col>
  </v-row>
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
// .score
//   padding 0 2px

// .score-FT
//   display inline-block
//   transform scale(0.9)
//   transform-origin center center
//   width 35px

// .score-HT
//   display inline-block
//   transform scale(0.8)
//   transform-origin center center
//   width 35px

// .rank
//   width 20px
//   font-weight bold

// .team
//   width 47px
//   white-space nowrap
//   overflow hidden

// .rank
//   display inline-block
//   transform scale(0.8)
//   transform-origin center center
</style>
