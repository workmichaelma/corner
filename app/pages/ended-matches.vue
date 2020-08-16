<template>
  <v-layout align-center justify-center>
    <v-flex class="text-center" xs12 sm8 md10>
      <match-list v-bind="{matches}" />
    </v-flex>
  </v-layout>
</template>

<script>
import MatchList from '~/components/matchList'

export default {
  components: {
    MatchList
  },
  computed: {
    matches () {
      return this.$store.state.matchList.ended || []
    }
  },
}
</script>

<style lang="stylus">
</style>