<template>
  <v-flex class="odd-col text-center flex-grow-1">
    <div>
      {{ odd.LINE }}
    </div>
    <div class="odd ">
      {{ odd.H }}
    </div>
    <div
      class="lighten-1"
      :class="`${result !== '' ? (isHigh ? 'red' : 'green') : ''}--text`"
    >
      {{ resultString }}
    </div>
  </v-flex>
</template>

<script>
export default {
  name: "full-history-result-HIL",
  props: {
    odd: {
      required: false,
      default: -1
    },
    result: {
      required: false,
      default: ""
    }
  },
  computed: {
    resultString() {
      return this.isHigh ? "大" : "細";
    },
    isHigh() {
      return this.result === "H";
    }
  }
};
</script>

<style lang="stylus" scoped>
.odd
  padding 1px 0
  transform scale(0.8)
  transform-origin center center
</style>
