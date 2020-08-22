<template>
  <div :class="{overflowed}">
    <div>
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'match-profile-team',
  props: {
    name: {
      required: true,
      default: ''
    }
  },
  computed: {
    overflowed () {
      return this.name.length > 5
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes slide-me
  0%
    transform translateX(0)
  10%
    transform translateX(0)
  40%
    transform translateX(-50%)
  60%
    transform translateX(-50%)
  90%
    transform translateX(0)
  100%
    transform translateX(0)
.overflowed
  max-width 100%
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  > div
    animation-name slide-me
    animation-duration 10s
    animation-iteration-count infinite
    animation-timing-function linear
</style>