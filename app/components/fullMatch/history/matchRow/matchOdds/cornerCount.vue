<template>
  <v-flex
    :class="
      `corner-count d-flex flex-column align-center justify-center title font-weight-bold flex-grow-0 flex-shrink-0 ${
        result !== '' && count > -1 ? (isHigh ? 'red' : 'green') : ''
      } lighten-1`
    "
  >
    {{ count > -1 ? count : "-" }}
  </v-flex>
</template>

<script>
export default {
  name: "corner-count",
  props: {
    count: {
      required: true,
      default: ""
    },
    result: {
      required: true,
      default: ""
    }
  },
  computed: {
    isHigh() {
      return this.result === "H";
    }
  }
};
</script>

<style lang="stylus" scoped>
.corner-count
  width 25px
  flex-basis 25px
  height 100%
</style>
