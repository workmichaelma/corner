<template>
  <v-flex class="d-flex flex-column">
    <v-flex class="team-row flex-shrink-0 col-12" id="match__team-profile">
      <team v-bind="{isHome: true, team: match.homeTeam}" />
      <team v-bind="{isHome: false, team: match.awayTeam}" />
    </v-flex>
  </v-flex>
</template>

<script>
import format from 'date-fns/format'
import Team from './team'
export default {
  components: {
    Team,
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style lang="stylus" scoped>
.team-row
  display grid
  grid-template-columns 1fr 1fr
</style>