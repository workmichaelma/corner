<template>
  <v-flex class="justify-space-between pt-0 pb-1 text-center" v-if="match.ended && result">
    <v-flex class="d-flex font-weight-bold pb-1">
      <v-flex class="team">
        {{ result.FT.home }}
      </v-flex>
      <v-flex class="caption d-flex justify-center align-center font-weight-bold mark">
        全場
      </v-flex>
      <v-flex class="team">
        {{ result.FT.away }}
      </v-flex>
    </v-flex>
    <v-flex class="d-flex caption pb-1">
      <v-flex class="team">
        {{ result.HT.home }}
      </v-flex>
      <v-flex class="d-flex justify-center align-center mark">
        半場
      </v-flex>
      <v-flex class="team">
        {{ result.HT.away }}
      </v-flex>
    </v-flex>
    <template v-if="get(result, 'corner.full.home')">
      <v-flex class="d-flex font-weight-bold pb-1">
        <v-flex class="team">
          {{ get(result, 'corner.full.home', '') }}
        </v-flex>
        <v-flex class="caption d-flex justify-center align-center font-weight-bold mark">
          全場角球
        </v-flex>
        <v-flex class="team">
          {{ get(result, 'corner.full.away', '') }}
        </v-flex>
      </v-flex>
      <v-flex class="d-flex caption pb-1">
        <v-flex class="team">
          {{ get(result, 'corner.half.home', '') }}
        </v-flex>
        <v-flex class="d-flex justify-center align-center mark">
          半場角球
        </v-flex>
        <v-flex class="team">
          {{ get(result, 'corner.half.away', '') }}
        </v-flex>
      </v-flex>
    </template>
    <template v-else-if="get(result, 'corner.full.total')">
      角球 {{ get(result, 'corner.full.total') }}
    </template>
  </v-flex>  
</template>

<script>
import { get } from 'lodash'
export default {
  name: 'fullMatch-result',
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
    result () {
      return get(this.match, 'result')
    }
  },
  methods: {
    get,
  }
}
</script>

<style lang="stylus" scoped>
.team
  flex-basis calc( 50% - 25px )
  width calc( 50% - 25px )

.mark
  flex-basis 50px
  width 50px
</style>