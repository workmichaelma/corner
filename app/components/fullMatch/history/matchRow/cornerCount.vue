<template>
  <v-flex
    :class="
      `corner-count d-flex flex-column align-center justify-center title font-weight-bold ${
        isHigh ? 'red' : 'green'
      }--text lighten-1`
    "
  >
    <v-flex
      class="badge align-center justify-center"
      :class="{ _right: right }"
    >
      {{ isHigh ? "大" : "細" }}
    </v-flex>
    <span class="count">{{ count }}</span>
  </v-flex>
</template>

<script>
export default {
  props: {
    count: {
      required: true,
      default: ""
    },
    result: {
      required: true,
      default: ""
    },
    right: {
      required: true,
      default: false
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
  position relative
  .badge
    position absolute
    top -7px
    width 10px
    height 10px
    left 1px
    font-size xx-small !important
    line-height 12px
    &._right
      right 1px
      left unset
</style>
