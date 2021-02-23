<template>
  <div class="d-flex justify-center align-center text-center">
    <div class="px-0 py-0" :class="{'lime--text accent-1': result === 'H'}">
      {{ get(odd, 'H') }}
    </div>
    <div class="mx-3 px-0 py-0" :class="{'lime--text accent-1': result === 'D'}">
      {{ get(odd, 'D') }}
    </div>
    <div class="px-0 py-0" :class="{'lime--text accent-1': result === 'A'}">
      {{ get(odd, 'A') }}
    </div>
  </div>
</template>
<script>
import get from 'lodash/get'
export default {
  name: 'result-had',
  props: {
    time: {
      required: true,
      default: ''
    },
    odds: {
      required: true,
      default: []
    },
    result: {
      required: true,
      default: ''
    }
  },
  computed: {
    valid () {
      return this.time && get(this, 'odds', []).length === 2 && this.result
    },
    odd () {
      return this.odds[this.isFirst ? 0 : 1]
    },
    isFirst () {
      return this.time === 'first'
    }
  },
  methods: {
    get,
  }
}
</script>
