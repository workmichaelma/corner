<template>
  <v-flex id="match__history" class="d-flex col-12 flex-column px-0">
    <v-flex class="d-flex">
      <div class="col-6 caption pa-0">
        <v-btn tile v-on:click="to(0)">
          {{ match.homeTeam.teamName}}
        </v-btn>
      </div>
      <div class="d-flex col-6 caption pa-0 justify-end">
        <v-btn tile v-on:click="to(2)">
          {{ match.awayTeam.teamName}}
        </v-btn>
      </div>
    </v-flex>
    <control-bar v-bind="{match, updateControlConfig, disabled: pages[currentPage] === 'all'}" />
    <v-flex class="d-flex">
      <v-carousel v-model="currentPage" hide-delimiters :show-arrows="false" :continuous="false" height="auto">
        <v-carousel-item
          v-for="page in ['home', 'all', 'away']"
          :key="`history-${page}`"
        >
          <all v-if="page === 'all'" v-bind="{match, config}" />
          <side v-else v-bind="{match, side: page, config}" />
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-flex>
</template>
<script>
import All from './all'
export default {
  components: {
    All,
  },
  data () {
    return {
      currentPage: 1,
      pages: ['home', 'all', 'away'],
      config: {
        showSameSide: false,
        showSameLeague: false,
        showSimilarOdd: false,
        oddsRange: null
      }
    }
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  methods: {
    to (page) {
      this.currentPage = this.currentPage === page ? 1 : page
    },
    updateControlConfig (v) {
      this.config = v
    }
  },
  watch: {
    config (v) {
      console.log('diu', v)
    }
  }
}
</script>
