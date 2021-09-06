<template>
  <v-layout justify-center align-center class="py-15">
    <v-flex xs12 sm8 md10>
      <match-list v-bind="{ matches: schedule }" />
    </v-flex>
  </v-layout>
</template>

<script>
import MatchesByDate from "~/mixins/matchesByDate";
import MatchList from "~/components/schedule/matchList";

export default {
  name: "page-schedule",
  async asyncData({ params, store }) {
    await store.dispatch("schedulePage/init", {
      ended: false
    });
  },
  mixins: [MatchesByDate],
  head() {
    return {
      title: "賽程"
    };
  },
  components: {
    MatchList
  },
  computed: {
    matches() {
      return this.$store.state.schedulePage.future || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
