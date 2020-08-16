<template>
  <v-flex id="match__profile" class="d-flex col-12 caption justify-space-between align-center">
    <div>
      {{ format(new Date(match.matchTime), 'YYYY-MM-DD HH:mm') }}
    </div>
    <div>
      {{ match.league.name }}
    </div>
  </v-flex>
</template>
<script>
import Match from '~/mixins/match'
import get from 'lodash/get'
import format from 'date-fns/format'
export default {
  mixins: [
    Match
  ],
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  methods: {
    format
  }
}
</script>
