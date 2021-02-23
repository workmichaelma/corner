<template>
  <div class="d-flex justify-center align-center text-center">
    <div class="px-0 py-0" :class="{'lime--text accent-1': timeResult === 'H'}">
      {{ get(odd, 'H') }}
    </div>
    <div class="mx-3 px-0 py-0 font-weight-bold">
      {{ get(odd, 'LINE') }}
    </div>
    <div class="px-0 py-0" :class="{'lime--text accent-1': timeResult === 'L'}">
      {{ get(odd, 'L') }}
    </div>
  </div>
</template>
<script>
import { isObject, get } from 'lodash'
export default {
  name: 'result-hl',
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
      return this.time && get(this, 'odds', []).length === 2 && isObject(this.result)
    },
    odd () {
      return this.odds[this.isFirst ? 0 : 1]
    },
    timeResult () {
      return get(this, `result[${this.time}]`, '')
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
