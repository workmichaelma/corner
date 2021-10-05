<template>
  <v-flex
    :class="
      `corner-count d-flex flex-column align-center justify-center title font-weight-bold flex-grow-1 flex-shrink-0 ${
        result !== '' && count > -1 && hasCHL ? (isHigh ? 'red' : 'green') : ''
      } lighten-1`
    "
  >
    {{ count > -1 ? count : "-" }}
  </v-flex>
</template>

<script>
import { isEmpty } from "lodash";
export default {
  name: "corner-count",
  props: {
    count: {
      required: true,
      default: -1
    },
    result: {
      required: true,
      default: ""
    },
    odds: {
      required: true,
      default: []
    }
  },
  computed: {
    isHigh() {
      return this.result === "H";
    },
    hasCHL() {
      return !isEmpty(this.odds);
    }
  }
};
</script>

<style lang="stylus" scoped>
.corner-count
  // width 25px
  // flex-basis 25px
  // height 100%
</style>
