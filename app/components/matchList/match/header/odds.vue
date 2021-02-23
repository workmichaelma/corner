<template>
  <v-flex class="header-info pt-1 body-2 align-center d-flex">
    <v-flex class="d-flex text-right odd flex-grow-1 justify-end">
      <template v-if="!isEmpty(HDC)">
        <v-flex class="flex-grow-0 grey--text lighten-2">
          {{HDC.H}}
        </v-flex>
        <v-flex class="flex-grow-0 mx-2">
          {{HDC.HG}}
        </v-flex>
        <v-flex class="flex-grow-0 grey--text lighten-2">
          {{HDC.A}}
        </v-flex>
      </template>
      <template v-else>
        <v-flex class="flex-grow-0">
          {{HAD.H}}
        </v-flex>
        <v-flex class="flex-grow-0 mx-2">
          {{HAD.D}}
        </v-flex>
        <v-flex class="flex-grow-0">
          {{HAD.A}}
        </v-flex>
      </template>
    </v-flex>
    <v-flex class="result flex-grow-0 flex-shrink-0 text-center">
      <template v-if="!isEmpty(HT)">
        {{`${HT.home}-${HT.away}`}}
      </template>
    </v-flex>
    <v-flex class="d-flex text-left odd flex-grow-1">
      <template v-if="!isEmpty(HIL)">
        <v-flex class="flex-grow-0 grey--text lighten-2">
          {{HIL.H}}
        </v-flex>
        <v-flex class="flex-grow-0 mx-2">
          {{HIL.LINE}}
        </v-flex>
        <v-flex class="flex-grow-0 grey--text lighten-2">
          {{HIL.L}}
        </v-flex>
      </template>
    </v-flex>
  </v-flex>
</template>

<script>
import { isEmpty } from 'lodash'
export default {
  name: 'match-header-odds',
  props: {
    HIL: {
      default: {}
    },
    HDC: {
      default: {}
    },
    HT: {
      default: {}
    },
    HAD: {
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

.odd
  flex-basis calc( 100% - 50px )

</style>>