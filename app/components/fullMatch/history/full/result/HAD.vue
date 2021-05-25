<template>
  <v-flex class="d-flex justify-space-around align-center had">
    <div :class="getHADResultStyle('H', result)">
      {{ odd.H }}
    </div>
    <div :class="getHADResultStyle('D', result)">
      {{ odd.D }}
    </div>
    <div :class="getHADResultStyle('A', result)">
      {{ odd.A }}
    </div>
  </v-flex>
</template>

<script>
import { getHADResultStyle } from "~/utils";
export default {
  name: "full-history-result-HAD",
  props: {
    odd: {
      required: true,
      default: {}
    },
    result: {
      required: true,
      default: ""
    }
  },
  methods: {
    getHADResultStyle
  }
};
</script>

<style lang="stylus" scoped>
.had
  width 100px
</style>
