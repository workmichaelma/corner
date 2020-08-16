<template>
<div>
  all
</div>
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
  }
}
</script>
