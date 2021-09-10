<template>
  <v-flex>
    <v-flex class="d-flex">
      <v-flex></v-flex>
      <v-flex>
        <v-flex class="d-flex text-center">
          <v-flex>
            {{ match.matchNum }}
          </v-flex>
          <v-flex>
            {{ `${match.matchDate} ${match.matchTime}` }}
          </v-flex>
          <v-flex>
            {{ match.league.name }}
          </v-flex>
        </v-flex>
        <v-flex class="d-flex">
          <NuxtLink
            :to="`/team/${home.name}`"
            class="text-decoration-none white--text d-flex"
          >
            <v-flex class="d-flex text-center align-center">
              <v-flex v-if="home.rank" class="text-mini text-right mr-1">
                [ {{ home.rank }} ]
              </v-flex>
              <v-flex v-if="home.name" class="text-bigger">
                {{ home.name }}</v-flex
              >
            </v-flex>
          </NuxtLink>
          <v-flex class="d-flex text-center">
            <v-flex v-if="!match.result"> - </v-flex>
          </v-flex>
          <NuxtLink
            :to="`/team/${away.name}`"
            class="text-decoration-none white--text d-flex"
          >
            <v-flex class="d-flex text-center align-center">
              <v-flex v-if="away.name" class="text-bigger">
                {{ away.name }}</v-flex
              >
              <v-flex v-if="away.rank" class="text-mini text-left ml-1">
                [ {{ away.rank }} ]
              </v-flex>
            </v-flex>
          </NuxtLink>
        </v-flex>
      </v-flex>
      <v-flex> </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
import { get } from "lodash";
export default {
  name: "header-matches-bar",
  props: {
    currentMatchId: {
      required: true,
      default: null
    }
  },
  computed: {
    match() {
      return get(this.$store, `state.match[${this.currentMatchId}]`, {});
    },
    home() {
      const t = get(this.match, "homeTeam", {});
      return {
        rank: t.rank,
        name: t.teamName
      };
    },
    away() {
      const t = get(this.match, "awayTeam", {});
      return {
        rank: t.rank,
        name: t.teamName
      };
    }
  },
  methods: {
    get
  }
};
</script>

<style></style>
