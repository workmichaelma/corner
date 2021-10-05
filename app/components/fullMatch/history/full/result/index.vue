<template>
  <v-row class="d-flex ma-0">
    <!-- <HAD v-bind="{ odd: get(odds, 'HAD[0]'), result: get(result, 'HAD') }" /> -->
    <v-col cols="6" class="pa-0 ma-0 d-flex justify-center">
      <HDC
        v-bind="{
          odd: get(odds, 'HDC[0]'),
          result: get(result, 'HDC'),
          FAKE_HDC,
          isHome
        }"
      />
    </v-col>
    <v-col cols="3" class="pa-0 ma-0 d-flex justify-center">
      <HIL v-bind="{ odd: get(odds, 'HIL[0]'), result: get(result, 'HIL') }" />
    </v-col>
    <v-col cols="3" class="pa-0 ma-0 d-flex justify-center">
      <CHL v-bind="{ odd: get(odds, 'CHL[0]'), result: get(result, 'CHL') }" />
    </v-col>
  </v-row>
</template>

<script>
import get from "lodash/get";
import CHL from "./CHL";
import HAD from "./HAD";
import HIL from "./HIL";
import HDC from "./HDC";
export default {
  name: "full-history-result",
  components: {
    CHL,
    HAD,
    HIL,
    HDC
  },
  props: {
    odds: {
      required: true,
      default: {}
    },
    result: {
      required: true,
      default: {}
    },
    isHome: {
      required: false,
      default: true
    },
    FAKE_HDC: {
      required: false,
      default: {}
    }
  },
  methods: {
    get
  }
};
</script>

<style></style>
