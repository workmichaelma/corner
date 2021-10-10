<template>
  <v-flex
    class="d-flex flex-row align-center justify-center text-mini text-center"
  >
    <template v-if="corner.home > -1 && corner.away > -1">
      <v-flex
        :class="isHome ? 'lime--text lighten-2' : ''"
        class="d-flex justify-end"
      >
        {{ corner.home }}
      </v-flex>
      <v-flex class="d-flex justify-center">-</v-flex>
      <v-flex
        :class="!isHome ? 'lime--text lighten-2' : ''"
        class="d-flex justify-start"
      >
        {{ corner.away }}
      </v-flex>
    </template>
  </v-flex>
</template>

<script>
import { isEmpty } from "lodash";
export default {
  name: "corner-count",
  props: {
    isHome: {
      required: true,
      default: true
    },
    corner: {
      required: true,
      default: {}
    }
    // odds: {
    //   required: true,
    //   default: []
    // }
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
