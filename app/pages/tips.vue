<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md10>
      <match-list v-bind="{ matches }" />
    </v-flex>
  </v-layout>
</template>

<script>
import MatchList from "~/components/tips/index";

export default {
  async asyncData({ params, store }) {
    await store.dispatch("tips/init");
  },
  head() {
    return {
      title: "貼士"
    };
  },
  components: {
    MatchList
  },
  computed: {
    matches() {
      return this.$store.state.tips.matches || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
