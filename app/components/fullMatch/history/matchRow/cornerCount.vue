<template>
  <v-flex class="d-flex flex-column align-center justify-center text-h6 font-weight-bold lime--text darken-1">
    {{ count }}
  </v-flex>
</template>

<script>
export default {
  props: {
    count: {
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>