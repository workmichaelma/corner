<template>
  <v-layout class="text-center d-flex flex-column">
    <template v-if="result !== '' && result && odd.LINE">
      <v-flex class="d-flex justify-center flex-row align-center">
        {{ odd.LINE }}
      </v-flex>
      <v-flex class="d-flex justify-center flex-row align-center">
        {{ odd.H }}
      </v-flex>
      <v-flex
        class="lighten-1 d-flex justify-center flex-row align-center"
        :class="`${result !== '' ? (isHigh ? 'red' : 'green') : ''}--text`"
      >
        {{ resultString }}
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
export default {
  name: "half-history-HIL",
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

<style lang="stylus" scoped></style>
