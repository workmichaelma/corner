<template>
  <v-flex
    :class="
      `corner-count d-flex flex-column align-center justify-center title font-weight-bold ${
        result !== '' ? (isHigh ? 'red' : 'green') : ''
      } lighten-1`
    "
  >
    <span class="count">{{ count ? count : "" }}</span>
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
