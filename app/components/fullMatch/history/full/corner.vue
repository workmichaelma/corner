<template>
  <v-flex
    class="corner px-3 text-center"
    :class="
      `${
        count > -1 && highLow !== null
          ? `${isHigh ? 'red' : 'green'}--text`
          : ''
      } lighten-1`
    "
  >
    {{ count > -1 ? count : "-" }}
  </v-flex>
</template>

<script>
import get from "lodash/get";
export default {
  name: "full-history-corner",
  props: {
    result: {
      required: true,
      default: ""
    }
  },
  computed: {
    count() {
      return get(this.result, "corner.full.total");
    },
    highLow() {
      return get(this.result, "CHL.first", null);
    },
    isHigh() {
      return this.highLow === "H";
    }
  }
};
</script>

<style lang="stylus" scoped>
.corner
  width 50px
</style>
