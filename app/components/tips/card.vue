<template>
  <v-card shaped outlined class="ma-2 pa-3">
    <v-flex @click="to()">
      <v-flex class="pa-1 d-flex">
        <v-flex>
          {{ match.matchDatetime }}
        </v-flex>
        <v-flex class="text-left">
          {{ match.league.name }}
        </v-flex>
        <v-flex class="text-right">
          {{ match.odds.CHL[0].LINE }}
        </v-flex>
      </v-flex>
      <v-flex class="d-flex text-center">
        <v-flex>
          [ {{ match.homeTeam.rank }} ] {{ match.homeTeam.teamName }}
        </v-flex>
        <v-flex>
          {{ match.awayTeam.teamName }} [ {{ match.awayTeam.rank }} ]
        </v-flex>
      </v-flex>
      <v-flex class="d-flex text-center">
        <v-flex v-for="(side, i) in ['home', 'away']" :key="i">
          <v-flex> 大 - {{ stat[side].CHL.H }} </v-flex>
          <v-flex> 細 - {{ stat[side].CHL.L }} </v-flex>
          <v-flex> 大率 - {{ stat[side].CHL.percent }}% </v-flex>
        </v-flex>
      </v-flex>
    </v-flex>
    <v-divider class="my-2" />
    <v-flex class="d-flex">
      <v-flex class="history">
        <history
          v-for="(m, i) in match.history.home"
          :key="i"
          v-bind="{ match: m, datetime: match.matchDatetime, side: 'home' }"
        />
      </v-flex>
      <v-flex class="history">
        <history
          v-for="(m, i) in match.history.away"
          :key="i"
          v-bind="{ match: m, datetime: match.matchDatetime, side: 'away' }"
        />
      </v-flex>
    </v-flex>
  </v-card>
</template>

<script>
import get from "lodash/get";
import History from "./history.vue";
export default {
  name: "tips-card",
  props: {
    card: {
      required: true,
      default: {}
    }
  },
  computed: {
    match() {
      return get(this.card, "match", {});
    },
    stat() {
      return get(this.card, "stat", {});
    }
  },
  components: {
    History
  },
  methods: {
    to() {
      this.$router.push(`/match/${this.match.id}`);
    }
  }
};
</script>

<style></style>
<style lang="stylus" scoped>
.history
  flex-basis 50%
  max-width 50%
</style>
