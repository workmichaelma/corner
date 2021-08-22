<template>
  <v-card shaped outlined @click="to()">
    <v-flex class="pa-1 d-flex">
      <v-flex>
        {{ match.matchDatetime }}
      </v-flex>
      <v-flex>
        {{ match.league.name }}
      </v-flex>
    </v-flex>
    <v-flex class="d-flex">
      <v-flex>
        [ {{ match.homeTeam.rank }} ] {{ match.homeTeam.teamName }}
      </v-flex>
      <v-flex>
        {{ match.awayTeam.teamName }} [ {{ match.awayTeam.rank }} ]
      </v-flex>
    </v-flex>
    <v-flex class="d-flex">
      <v-flex v-for="(side, i) in ['home', 'away']" :key="i">
        <v-flex> 大 - {{ stat[side].CHL.H }} </v-flex>
        <v-flex> 細 - {{ stat[side].CHL.L }} </v-flex>
        <v-flex> 大率 - {{ stat[side].CHL.percent }} </v-flex>
      </v-flex>
    </v-flex>
  </v-card>
</template>

<script>
import get from "lodash/get";
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
  methods: {
    to() {
      this.$router.push(`/match/${this.match.id}`);
    }
  }
};
</script>

<style></style>
