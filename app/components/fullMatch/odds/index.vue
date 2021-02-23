<template>
  <v-flex class="d-flex flex-column py-1" v-if="match.ended && match.result">
    <row v-bind="{ type: 'default' }" />
    <row v-for="(arr, type) in odds" v-bind="{ type, odds: arr, result: get(result, type) }" :key="`odds_${type}`" />
  </v-flex>
</template>
<script>
import { get } from 'lodash'
import Row from './row'
export default {
  name: 'fullMatch-result-odds',
  components: {
    Row
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
    result () {
      return get(this, 'match.result')
    },
    odds () {
      return get(this, 'match.odds_firstlatest', [])
    }
  },
  methods: {
    get,
  }
}
</script>