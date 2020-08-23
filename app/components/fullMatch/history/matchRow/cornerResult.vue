<template>
  <v-flex class="d-flex align-center justify-center" v-if="H && L && LINE">
    <v-flex class="odd d-flex align-center justify-center col-4 caption pa-0" :class="[`${result === 'H' ? 'lime--text darken-1' : 'grey--text darken-1'}`]">
      {{ H }}
    </v-flex>
    <v-flex class="d-flex align-center justify-center col-4 body-2 pa-0" :style="{transform: 'scale(1.1)'}">
      {{ LINE }}
    </v-flex>
    <v-flex class="odd d-flex align-center justify-center col-4 caption pa-0" :class="[`${result === 'L' ? 'lime--text darken-1' : 'grey--text darken-1'}`]">
      {{ L }}
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  props: {
    H: {
      required: true,
      default: ''
    },
    L: {
      required: true,
      default: ''
    },
    LINE: {
      required: true,
      default: ''
    },
    result: {
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.odd
  transform scale(0.85)
</style>