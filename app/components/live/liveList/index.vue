<template>
  <v-list>
    <v-list-item v-for="match in matches" :key="match.id">
      <v-list-item-avatar>{{
        moment(match.start)
          .utcOffset(480)
          .format("HH:mm")
      }}</v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          v-text="`${match.homeName} 對 ${match.awayName}`"
        ></v-list-item-title>

        <v-list-item-subtitle v-text="match.league"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1" v-on:click="play(match.url)"
            >mdi-play-circle</v-icon
          >
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import moment from "moment";
export default {
  name: "live-list",
  props: {
    matches: {
      default: [],
      required: true
    },
    setSrc: {
      default: () => {},
      required: true
    }
  },
  methods: {
    moment,
    play(url) {
      if (url) this.setSrc(url);
    }
  }
};
</script>

<style></style>
