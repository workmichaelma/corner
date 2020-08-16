<template>
  <v-expansion-panel-header class="pr-2 pl-4">
    <v-flex class="flex-column pr-1">
      <v-flex class="d-flex flex-row caption">
        <div>
          {{ format(new Date('2020-08-12T18:00:00+08:00'), 'DD/MM HH:mm') }}
        </div>
        <v-spacer />
        <v-flex class="d-flex align-self-sm-end text-right align-center justify-end" v-if="CHL">
          <div class="font-italic" :class="{'green--text lighten-2 font-weight-black': get(match, 'result.CHL') === 'H'}">
            {{ CHL.H }}
          </div>
          <v-divider class="mx-1" vertical />
          <div class="lime--text accent-1" :class="{'font-weight-black': !match.ended}">
            {{ CHL.LINE.split('/')[0] }}
          </div>
          <v-divider class="mx-1" vertical />
          <div class="font-italic" :class="{'green--text lighten-2 font-weight-black': get(match, 'result.CHL') === 'L'}">
            {{ CHL.L }}
          </div>
        </v-flex>
      </v-flex>
      <v-flex class="team-row pt-1 body-2 align-center">
        <div>
          {{ match.homeTeam.teamName }}
        </div>
        <div v-if="match.ended">
          <v-flex class="d-flex align-center justify-center flex-grow-0" v-if="match.result.corner">
            {{ match.result.corner }}
            <v-icon right size="14" class="ml-0">mdi-flag-triangle</v-icon>
          </v-flex>
          <v-flex class="d-flex justify-center align-center">
            {{ `${match.result.FT.home} : ${match.result.FT.away}` }}
          </v-flex>
          <v-flex class="d-flex justify-center align-center caption">
            {{ `[ ${match.result.HT.home} : ${match.result.HT.away} ]` }}
          </v-flex>
        </div>
        <v-spacer v-else />
        <div class="align-self-sm-end text-right">
          {{ match.awayTeam.teamName }}
        </div>
      </v-flex>
    </v-flex>
  </v-expansion-panel-header>  
</template>
<script>
import format from 'date-fns/format'
import last from 'lodash/last'
import get from 'lodash/get'
export default {
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  methods: {
    format,
    get
  },
  computed: {
    CHL () {
      return last(get(this.match, 'odds.CHL', []))
    }
  },
}
</script>
<style lang="stylus" scoped>
.team-row
  display grid
  grid-template-columns 1fr auto 1fr
</style>