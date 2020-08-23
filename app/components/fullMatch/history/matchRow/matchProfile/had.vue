<template>
  <div class="had caption">
    <div class="odd" :class="{'grey--text darken-1': result !== 'H'}">
      {{ HAD.H }}
    </div>
    <div class="odd" :class="{'grey--text darken-1': result !== 'D'}">
      {{ HAD.D }}
    </div>
    <div class="odd" :class="{'grey--text darken-1': result !== 'A'}">
      {{ HAD.A }}
    </div>
  </div>  
</template>

<script>
export default {
  name: 'history-matchrow-matchprofile-had',
  props: {
    HAD: {
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
.had
  display grid
  grid-template-columns 1fr 1fr 1fr
  overflow hidden
  >.odd
    transform scale(0.7)
</style>