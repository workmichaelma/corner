<template>
  <div class="d-flex justify-center align-center text-center caption">
    <div class="col-4 px-0 py-0" :class="{'lime--text accent-1': match.result.HAD === 'H'}">
      {{ HAD_1.H }}
    </div>
    <div class="col-4 px-0 py-0" :class="{'lime--text accent-1': match.result.HAD === 'D'}">
      {{ HAD_1.D }}
    </div>
    <div class="col-4 px-0 py-0" :class="{'lime--text accent-1': match.result.HAD === 'A'}">
      {{ HAD_1.A }}
    </div>
  </div>
</template>
<script>
import Match from '~/mixins/match'
import get from 'lodash/get'
import format from 'date-fns/format'
export default {
  name: 'result-had',
  mixins: [
    Match
  ],
  props: {
    match: {
      required: true,
      default: {}
    }
  }  
}
</script>
