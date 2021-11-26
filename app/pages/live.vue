<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md10>
      <player v-bind="{ src }" />
      <live-list v-bind="{ matches, setSrc }" />
    </v-flex>
  </v-layout>
</template>

<script>
import LiveList from "~/components/live/liveList/index.vue";
import Player from "~/components/live/player/index.vue";

export default {
  async asyncData({ params, store }) {
    await store.dispatch("livePage/init");
  },
  head() {
    return {
      title: "直播"
    };
  },
  data() {
    return {
      src: null
    };
  },
  components: {
    LiveList,
    Player
  },
  computed: {
    matches() {
      return this.$store.state.livePage.matches || [];
    }
  },
  methods: {
    setSrc(src) {
      this.src = src;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
