<template>
  <v-flex class="pt-1 grey darken-4">
    <v-flex v-for="(m, i) in matches" :key="i" class="py-0">
      <v-divider v-if="i > 0" class="my-1" />
      <v-row class="ma-0 text-center">
        <v-col class="pa-0 text-truncate" cols="2">
          {{ m.league.name }}
        </v-col>
        <v-col class="pa-0" cols="4">
          {{ m.date }}
        </v-col>
        <v-col class="pa-0" cols="4" v-if="haveCorner(m)">
          {{
            `${m.result.corner.full.home}-${m.result.corner.full.away} [${m.result.corner.full.total}]`
          }}
        </v-col>
      </v-row>
      <v-row class="ma-0 text-center">
        <v-col class="pa-0 text-truncate" cols="2">
          {{ m.homeTeam.rank }}
        </v-col>
        <v-col class="pa-0 text-truncate" cols="3">
          {{ m.homeTeam.teamName }}
        </v-col>

        <v-col class="pa-0" cols="2">
          {{
            `${m.result.FT.home}-${m.result.FT.away} (${m.result.HT.home}-${m.result.HT.away})`
          }}
        </v-col>

        <v-col class="pa-0 text-truncate" cols="3">
          {{ m.awayTeam.teamName }}
        </v-col>
        <v-col class="pa-0 text-truncate" cols="2">
          {{ m.awayTeam.rank }}
        </v-col>
      </v-row>
    </v-flex>
  </v-flex>
</template>

<script>
import { get } from "lodash";
export default {
  name: "full-match-against",
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
    matches() {
      return get(this.match, "against", []);
    }
  },
  methods: {
    haveCorner(match) {
      return get(match, "result.corner.full.total", false);
    }
  }
};
</script>

<style></style>
