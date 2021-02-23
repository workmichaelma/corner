<template>
  <v-flex class="header-info pt-1 body-2 align-center d-flex">
    <v-flex class="text-right team flex-grow-1">
      <template v-if="!isEmpty(home)">
        {{`[${away.rank}] ${home.teamName}`}}
      </template>
    </v-flex>
    <v-flex class="result flex-grow-0 flex-shrink-0 text-center font-weight-bold">
      <template v-if="!isEmpty(FT)">
        {{`${FT.home} - ${FT.away}`}}
      </template>
    </v-flex>
    <v-flex class="text-left team flex-grow-1">
      <template v-if="!isEmpty(away)">
        {{`${away.teamName} [${away.rank}]`}}
      </template>
    </v-flex>
  </v-flex>
</template>

<script>
import { isEmpty } from 'lodash'
export default {
  name: 'match-header-teams',
  props: {
    home: {
      default: {}
    },
    away: {
      default: {}
    },
    FT: {
      default: {}
    }
  },
  methods: {
    isEmpty,
  }
}
</script>

<style lang="stylus">
.result
  flex-basis 50px
  width 50px

.team
  flex-basis calc( 100% - 50px )

</style>>