<template>
  <v-layout class="text-center d-flex flex-column">
    <template v-if="resultString && LINE">
      <v-flex class="d-flex justify-center flex-row align-center">
        {{ LINE }}
      </v-flex>
      <v-flex
        class="lighten-1 d-flex justify-center flex-row align-center"
        :class="`${resultString !== '' ? resultColor : ''}--text`"
      >
        {{ resultString }}
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { isEmpty } from "lodash";
import { getTeamResultColor } from "~/utils";
export default {
  name: "half-history-HDC",
  props: {
    odd: {
      required: false,
      default: -1
    },
    result: {
      required: false,
      default: ""
    },
    FAKE_HDC: {
      required: true,
      default: {}
    },
    isHome: {
      required: true,
      default: true
    }
  },
  computed: {
    useFake() {
      const { value, result, isFake } = this.FAKE_HDC;
      return value && result && (this.HDCResult === null || isEmpty(this.odd));
    },
    LINE() {
      if (this.FAKE_HDC.value) {
        if (this.isHome) {
          return this.FAKE_HDC.value;
        } else {
          if (this.FAKE_HDC.value.indexOf("受") > -1) {
            return this.FAKE_HDC.value.replace("受", "");
          } else if (this.FAKE_HDC.value !== "平手") {
            return `受${this.FAKE_HDC.value}`;
          }
          return this.FAKE_HDC.value;
        }
      }
      return null;
    },
    HDCResult() {
      return this.result.HDC;
    },
    HADResult() {
      return this.result.HAD;
    },
    resultString() {
      let result = this.HDCResult;
      if (this.useFake || this.HDCResult === null) {
        result = this.FAKE_HDC.result;
      }
      if (result === null && this.HADResult) {
        result = this.HADResult;
      }
      let txt = "";
      if (result.indexOf("H") > -1) {
        txt = "主";
      }
      if (result.indexOf("A") > -1) {
        txt = "客";
      }
      if (result === "D") {
        txt = "和";
      }

      if (txt === "和") {
        return "和";
      }
      if (this.isHome && txt === "主") {
        return "羸";
      }
      if (this.isHome && txt === "客") {
        return "輸";
      }
      if (!this.isHome && txt === "客") {
        return "羸";
      }
      if (!this.isHome && txt === "主") {
        return "輸";
      }

      return "";
    },
    resultColor() {
      return getTeamResultColor(this.resultString);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
