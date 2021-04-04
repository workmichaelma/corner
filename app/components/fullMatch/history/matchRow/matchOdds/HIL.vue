<template>
  <v-flex class="odd-col caption text-center flex-grow-0">
    <div>
      {{ odd.LINE }}
    </div>
    <div>
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
  name: "HIL-result",
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

<style lang="stylus">
.odd-col
  width 36px
  flex-basis 36px
</style>
