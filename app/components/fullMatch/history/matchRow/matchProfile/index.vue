<template>
  <v-flex class="d-flex flex-column">
    <v-flex class="d-flex">
      <v-flex class="d-flex flex-column col-5 pa-0">
        <!-- 主隊 -->
        <team
          class="team text-center"
          :class="[color('home', match.homeTeam.teamID)]"
          v-bind="{ name: match.homeTeam.teamName }"
        />
        <!-- 主隊 -->

        <!-- 大細波 -->
        <had v-bind="{ HAD: HAD_1, result: match.result.HAD }" />
        <!-- 大細波 -->
      </v-flex>
      <!-- 比數 -->
      <result
        class="col-2 pa-0"
        v-bind="{
          result: match.result,
          color,
          homeId: match.homeTeam.teamID,
          awayId: match.awayTeam.teamID
        }"
      />
      <!-- 比數 -->
      <v-flex class="d-flex flex-column col-5 pa-0">
        <!-- 客隊 -->
        <team
          class="team text-center"
          :class="[color('away', match.awayTeam.teamID)]"
          v-bind="{ name: match.awayTeam.teamName }"
        />
        <!-- 客隊 -->

        <!-- 大細波 -->
        <hil v-bind="{ HIL: HIL_1, result: match.result.HIL }" />
        <!-- 大細波 -->
      </v-flex>
    </v-flex>
  </v-flex>
</template>
<script>
import Team from "./team";
import _HIL from "./hil";
import _HAD from "./had";
import _Result from "./result";
import Match from "~/mixins/match";
import get from "lodash/get";
import format from "date-fns/format";
export default {
  components: {
    Team,
    hil: _HIL,
    had: _HAD,
    result: _Result
  },
  mixins: [Match],
  props: {
    match: {
      required: true,
      default: {}
    },
    teamId: {
      required: true,
      default: ""
    }
  },
  computed: {
    HAD() {
      return get(this.match, "result.HAD");
    }
  },
  methods: {
    color(side, id) {
      if (this.teamId === id) {
        if (this.HAD === "D") return "light-blue--text darken-1";
        if (this.HAD === "H") {
          return side === "home"
            ? "red--text darken-3"
            : "green--text darken-1";
        }
        if (this.HAD === "A") {
          return side === "away"
            ? "red--text darken-3"
            : "green--text darken-1";
        }
      }
    }
  }
};
</script>
