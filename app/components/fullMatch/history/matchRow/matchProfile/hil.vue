<template>
  <div class="hil caption">
    <div class="odd" :class="{'grey--text darken-1': result !== 'H'}">
      {{ HIL.H }}
    </div>
    <div class="odd">
      {{ HIL.LINE }}
    </div>
    <div class="odd" :class="{'grey--text darken-1': result !== 'L'}">
      {{ HIL.L }}
    </div>
  </div>  
</template>

<script>
export default {
  name: 'history-matchrow-matchprofile-hil',
  props: {
    HIL: {
      required: true,
      default: {}
    },
    result: {
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.hil
  display grid
  grid-template-columns 1fr 1fr 1fr
  overflow hidden
  >.odd
    transform-origin 100%
    justify-self end
    transform scale(0.7)
    &:nth-child(2)
      transform scale(0.85)
</style>