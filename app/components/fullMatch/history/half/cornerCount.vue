<template>
  <v-flex class="d-flex flex-row align-center justify-center text-mini">
    <template v-if="corner.home > -1 && corner.away > -1">
      <d-flex :class="isHome ? 'lime--text lighten-2' : ''">
        {{ corner.home }}
      </d-flex>
      <d-flex>:</d-flex>
      <d-flex :class="!isHome ? 'lime--text lighten-2' : ''">
        {{ corner.away }}
      </d-flex>
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
