<template>
  <v-flex id="match__teams" class="d-flex col-12 justify-space-between text-center" v-if="valid">
    <v-flex>
      <NuxtLink :to="`/team/${home.teamName}`" class="link">
        {{ `[ ${home.rank} ] ${home.teamName}` }}
      </NuxtLink>
    </v-flex>
    <v-flex>
      <NuxtLink :to="`/team/${away.teamName}`" class="link">
        {{ `${away.teamName} [ ${away.rank} ]` }}
      </NuxtLink>
    </v-flex>
  </v-flex>
</template>
<script>
import Match from '~/mixins/match'
import { isEmpty, get } from 'lodash'
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
    get
  },
  computed: {
    home () {
      return get(this, 'match.homeTeam', {})
    },
    away () {
      return get(this, 'match.awayTeam', {})
    },
    valid () {
      return !isEmpty(this.home) && !isEmpty(this.away)
    }
  },
}
</script>

<style lang="stylus" scoped>
.link
  color white
  text-decoration none
</style>