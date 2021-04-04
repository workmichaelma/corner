<template>
  <v-flex class="d-flex caption justify-space-around align-center">
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
  name: "HAD-result",
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

<style></style>
