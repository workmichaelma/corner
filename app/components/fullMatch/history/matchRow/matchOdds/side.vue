<template>
  <v-flex
    class="had d-flex flex-column justify-space-around flex-grow-0 text-center"
    :class="resultColor"
  >
    <div>
      {{ side }}
    </div>
    <div>
      {{ resultString }}
    </div>
  </v-flex>
</template>

<script>
import { getTeamResultColor, getHADResultString } from "~/utils/";
export default {
  name: "side",
  props: {
    result: {
      required: true,
      default: ""
    },
    isHome: {
      required: true,
      default: true
    }
  },
  computed: {
    side() {
      return this.isHome ? "主" : "客";
    },
    resultString() {
      return getHADResultString(this.isHome ? "H" : "A", this.result);
    },
    resultColor() {
      return getTeamResultColor(this.resultString);
    }
  }
};
</script>

<style lang="stylus">
.had
  width 20px
  flex-basis 20px
</style>
