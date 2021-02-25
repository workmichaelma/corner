<template>
  <v-flex id="match__history" class="d-flex col-12 flex-column px-0">
    <team-picker
      v-bind="{
        home: get(match, 'homeTeam.teamName', ''),
        away: get(match, 'awayTeam.teamName', ''),
        to,
      }"
    />
    <control-bar
      v-bind="{
        HAD_H: get(match, 'odds_firstlatest.HAD[1].H'),
        updateControlConfig,
        disabled: pages[currentPage] === 'all',
      }"
    />
    <v-flex class="d-flex">
      <v-carousel
        v-model="currentPage"
        hide-delimiters
        :show-arrows="false"
        :continuous="false"
        height="auto"
      >
        <v-carousel-item
          v-for="page in ['home', 'all', 'away']"
          :key="`history-${page}`"
        >
          <all v-if="page === 'all'" v-bind="{ match, config }" />
          <!-- <side v-else v-bind="{ match, side: page, config }" /> -->
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-flex>
</template>
<script>
import { get } from "lodash";
import All from "./all";
import ControlBar from "./controlBar";
import TeamPicker from "./teamPicker";
export default {
  components: {
    All,
    ControlBar,
    TeamPicker,
  },
  data() {
    return {
      currentPage: 1,
      pages: ["home", "all", "away"],
      config: {
        showSameSide: false,
        showSameLeague: false,
        showSimilarOdd: false,
        oddsRange: null,
      },
    };
  },
  props: {
    match: {
      required: true,
      default: {},
    },
  },
  methods: {
    get,
    to(page) {
      this.currentPage = this.currentPage === page ? 1 : page;
    },
    updateControlConfig(v) {
      this.config = v;
    },
  },
  watch: {
    config(v) {
      console.log("diu", v);
    },
  },
};
</script>
