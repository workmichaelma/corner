<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex xs12 sm8 md10>
      <full-match v-bind="{id}" />
    </v-flex>
  </v-layout>
</template>

<script>
import get from 'lodash/get'
import FullMatch from '~/components/fullMatch'

export default {
  components: {
    FullMatch
  },
  computed: {
    id () {
      return get(this, '$route.params.slug')
    }
  },
}
</script>

<style lang="stylus">
</style>
