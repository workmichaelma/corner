<template>
  <v-layout align-center justify-center class="pb-15 pt-14">
    <v-flex class="text-center" xs12 sm8 md10>
      <match-list v-bind="{ matches: schedule }" />
    </v-flex>
  </v-layout>
</template>

<script>
import MatchesByDate from "~/mixins/matchesByDate";
import MatchList from "~/components/schedule/matchList";

export default {
  async asyncData({ params, store }) {
    await store.dispatch("schedulePage/init", {
      ended: true
    });
  },
  mixins: [MatchesByDate],
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
      return this.$store.state.schedulePage.ended || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
