<template>
  <v-expansion-panels multiple>
    <match
      v-for="(id,i) in matches"
      :key="i"
      v-bind="{id}"
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