<template>
  <v-layout justify-center align-center>
    <loading-overlay />
    <v-flex xs12 sm8 md10>
      <match-list v-bind="{ matches }" />
    </v-flex>
  </v-layout>
</template>

<script>
import LoadingOverlay from "~/components/LoadingOverlay";
import MatchList from "~/components/matchList";

export default {
  async asyncData({ params, store }) {
    await store.dispatch("schedulePage/init", {
      ended: false
    });
  },
  head() {
    return {
      title: "賽程"
    };
  },
  components: {
    MatchList,
    LoadingOverlay
  },
  computed: {
    matches() {
      // return this.$store.state.matchList.upcoming || []
      return this.$store.state.schedulePage.future || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
