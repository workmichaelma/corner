<template>
  <v-flex class="d-flex align-center justify-center">
    <v-flex class="d-flex align-center justify-center col-4 caption pa-0" :class="[`${result === 'H' && 'green--text accent-1'}`]" :style="{transform: 'scale(0.85)'}">
      {{ H }}
    </v-flex>
    <v-flex class="d-flex align-center justify-center col-4 body-2 pa-0" :style="{transform: 'scale(1.1)'}">
      {{ LINE }}
    </v-flex>
    <v-flex class="d-flex align-center justify-center col-4 caption pa-0" :class="[`${result === 'L' && 'green--text accent-1'}`]" :style="{transform: 'scale(0.85)'}">
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

</style>