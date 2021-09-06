<template>
  <v-expansion-panels multiple>
    <match
      v-for="(match,i) in matches"
      :key="i"
      v-bind="{match}"
    />
  </v-expansion-panels>
</template>

<script>
import Match from './match/index'
export default {
  name: 'match-list',
  components: {
    Match
  },
  props: {
    matches: {
      required: true,
      default: []
    }
  },
  computed: {
    
  },
}
</script>

<style lang="stylus" scoped>
  
</style>