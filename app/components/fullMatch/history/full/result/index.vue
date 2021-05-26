<template>
  <div class="d-flex">
    <HAD v-bind="{ odd: get(odds, 'HAD[0]'), result: get(result, 'HAD') }" />
    <HIL v-bind="{ odd: get(odds, 'HIL[0]'), result: get(result, 'HIL') }" />
    <CHL v-bind="{ odd: get(odds, 'CHL[0]'), result: get(result, 'CHL') }" />
  </div>
</template>

<script>
import get from "lodash/get";
import CHL from "./CHL";
import HAD from "./HAD";
import HIL from "./HIL";
export default {
  name: "full-history-result",
  components: {
    CHL,
    HAD,
    HIL
  },
  props: {
    odds: {
      required: true,
      default: {}
    },
    result: {
      required: true,
      default: {}
    }
  },
  methods: {
    get
  }
};
</script>

<style></style>
