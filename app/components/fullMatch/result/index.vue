<template>
  <v-flex id="match__result" class="d-flex col-12 pt-0">
    <score v-bind="{match}" />
    <list v-bind="{match}" />
  </v-flex>
</template>
<script>
import Match from '~/mixins/match'
import get from 'lodash/get'
import last from 'lodash/last'
import pick from 'lodash/pick'
import format from 'date-fns/format'
import Score from './score'
import List from './list'
export default {
  components: {
    Score
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  }  
}
</script>
