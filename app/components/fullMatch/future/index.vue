<template>
  <v-flex class="pt-1 grey darken-4">
    <v-row class="ma-0 text-center">
      <v-col
        class="pa-0"
        cols="6"
        v-for="(team, side) in ['home', 'away']"
        :key="side"
      >
        <template v-for="(match, i) in matches[team]">
          <v-flex :key="i">
            <v-divider v-if="i > 0" class="my-1" />
            <v-row class="ma-0">
              <v-col class="pa-0">
                {{ match.league }}
              </v-col>
              <v-col class="pa-0">
                {{ match.date }}
              </v-col>
              <v-col class="pa-0">
                {{ match.daysAfter }}
              </v-col>
            </v-row>
            <v-flex class="ma-0 text-center">
              {{ match.teams }}
            </v-flex>
          </v-flex>
        </template>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
import { get } from "lodash";
export default {
  name: "full-match-future",
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
    matches() {
      return get(this.match, "future", {});
    }
  }
};
</script>

<style></style>
