<template>
  <v-flex class="body-2 align-center d-flex">
    <v-flex class="side text-left">
      <span class="mr-1">{{ league }}</span>
      <span>{{ `${matchDate} ${matchTime}` }}</span>
    </v-flex>
    <v-flex class="corner text-center flex-grow-0">
      <template v-if="result">
        <div>{{ result }}</div>
      </template>
    </v-flex>
    <v-flex class="side d-flex justify-end">
      <v-flex
        class="odds d-flex justify-between text-center flex-grow-0"
        v-if="isEmpty(result) && !isEmpty(chl)"
      >
        <v-flex class="grey--text lighten-2">
          {{ chl.H }}
        </v-flex>
        <v-flex>
          {{ chl.LINE }}
        </v-flex>
        <v-flex class="grey--text lighten-2">
          {{ chl.L }}
        </v-flex>
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import { isEmpty } from "lodash";
export default {
  name: "match-header-info",
  props: {
    league: {
      default: ""
    },
    matchDate: {
      default: ""
    },
    matchTime: {
      default: ""
    },
    chl: {
      default: {}
    },
    result: {
      default: ""
    }
  },
  methods: {
    isEmpty
  }
};
</script>

<style lang="stylus" scoped>
.side
  flex-basis calc( 50% - 50px )
  width calc( 50% - 50px )
.corner
  width 50px
.odds
  width 90px
</style>
