<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex xs12 sm8 md10>
      <full-match v-if="!isUndefined(match) && !isEmpty(match)" v-bind="{match}" />
    </v-flex>
  </v-layout>
</template>

<script>
import { isEmpty, isUndefined } from 'lodash'
import FullMatch from '~/components/fullMatch'

export default {
  async asyncData ({ params, store }) {
    const { id } = params
    if (id) {
      const exist = await store.dispatch('match/fetchMatch', {
        id
      })
      console.log({ exist })
    }
  },
  components: {
    FullMatch
  },
  computed: {
    match () {
      const { id } = this.$route.params || {}
      if (id) {
        return this.$store.state.match[id]
      }
    }
  },
  methods: {
    isEmpty,
    isUndefined
  }
}
</script>

<style lang="stylus">
</style>
