<template>
  <v-layout class="text-center d-flex flex-column">
    <v-flex
      class="d-flex flex-column align-center justify-center text-mini text-0_7"
    >
      <template v-if="corner.home > -1 && corner.away > -1">
        {{ `${corner.home}-${corner.away}` }}
      </template>
    </v-flex>
    <v-flex class="d-flex flex-row px-3">
      <v-flex
        class="text-right"
        :class="
          getTeamResultcolorBySide(result.HAD, 'home', teamId, homeTeamId)
        "
      >
        {{ result.FT.home }}
      </v-flex>
      <v-flex class="mx-1">
        :
      </v-flex>
      <v-flex
        class="text-left"
        :class="
          getTeamResultcolorBySide(result.HAD, 'away', teamId, awayTeamId)
        "
      >
        {{ result.FT.away }}
      </v-flex>
    </v-flex>
    <v-flex class="d-flex flex-row px-2 text-mini text-0_7">
      <v-flex class="text-right">
        {{ `[${result.HT.home}` }}
      </v-flex>
      <v-flex class="mx-1">
        :
      </v-flex>
      <v-flex class="text-left">
        {{ `${result.HT.away}]` }}
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import { getTeamResultColor, getTeamResultcolorBySide } from "~/utils";
export default {
  name: "half-history-score",
  props: {
    isHome: {
      required: true,
      default: true
    },
    result: {
      required: true,
      default: {}
    },
    teamId: {
      required: true,
      default: ""
    },
    homeTeamId: {
      required: true,
      default: ""
    },
    awayTeamId: {
      required: true,
      default: ""
    }
  },
  computed: {
    resultString() {
      return this.isHigh ? "大" : "細";
    },
    isHigh() {
      return this.result === "H";
    },
    corner() {
      return this.result.corner.full;
    }
  },
  methods: {
    getTeamResultcolorBySide,
    scoreColor(side) {
      let txt = "";
      if (this.isHome) {
        if (side === "H") {
          if (this.result.HAD === "H") {
            txt = "羸";
          }
          if (this.result.HAD === "A") {
            txt = "輸";
          }
        } else {
          if (this.result.HAD === "H") {
            txt = "輸";
          }
          if (this.result.HAD === "A") {
            txt = "羸";
          }
        }
      }
      if (!this.isHome) {
        if (side === "A") {
          if (this.result.HAD === "A") {
            txt = "羸";
          }
          if (this.result.HAD === "H") {
            txt = "輸";
          }
        } else {
          if (this.result.HAD === "A") {
            txt = "輸";
          }
          if (this.result.HAD === "H") {
            txt = "羸";
          }
        }
      }
      return getTeamResultColor(txt);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
