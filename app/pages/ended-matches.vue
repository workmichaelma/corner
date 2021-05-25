<template>
  <v-layout align-center justify-center>
    <v-flex class="text-center" xs12 sm8 md10>
      <match-list v-bind="{ matches }" />
    </v-flex>
  </v-layout>
</template>

<script>
import MatchList from "~/components/matchList";

export default {
  async asyncData({ params, store }) {
    await store.dispatch("schedulePage/init", {
      ended: true
    });
  },
  head() {
    return {
      title: "完場比賽"
    };
  },
  components: {
    MatchList
  },
  computed: {
    matches() {
      // return this.$store.state.matchList.ended || []
      return this.$store.state.schedulePage.ended || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
