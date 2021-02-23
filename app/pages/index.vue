<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex xs12 sm8 md10>
      <match-list v-bind="{matches}" />
    </v-flex>
  </v-layout>
</template>

<script>
import MatchList from '~/components/matchList'

export default {
  async asyncData ({ params, store }) {
    await store.dispatch('schedulePage/init', {
      ended: false
    })
  },
  components: {
    MatchList
  },
  computed: {
    matches () {
      // return this.$store.state.matchList.upcoming || []
      return this.$store.state.schedulePage.future || []
    }
  },
}
</script>

<style lang="stylus">
</style>
