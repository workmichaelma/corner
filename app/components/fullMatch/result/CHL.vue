<template>
  <div class="d-flex justify-center align-center text-center caption" height="auto">
    <div class="col-4 px-0 py-0" :class="{'lime--text accent-1': match.result.CHL === 'H'}">
      {{ CHL_1.H }}
    </div>
    <div class="col-4 px-0 py-0">
      {{ CHL_1.LINE.split('/')[0] }}
    </div>
    <div class="col-4 px-0 py-0" :class="{'lime--text accent-1': match.result.CHL === 'L'}">
      {{ CHL_1.L }}
    </div>
  </div>
</template>
<script>
import Match from '~/mixins/match'
export default {
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
