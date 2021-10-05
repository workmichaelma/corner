<template>
  <div class="profile d-flex">
    <div class="px-1">
      {{ matchDate }}
    </div>
    <div class="px-1 league">
      {{ leagueName }}
    </div>
    <Corner v-bind="{ result }" />
  </div>
</template>

<script>
import get from "lodash/get";
import Corner from "./corner";
export default {
  name: "full-history-profile",
  components: {
    Corner
  },
  props: {
    result: {
      default: {},
      required: true
    },
    leagueName: {
      default: "",
      required: true
    },
    matchDate: {
      default: "",
      required: true
    }
  },
  methods: {
    get
  }
};
</script>

<style lang="stylus" scoped>
.profile
  align-self center
  transform scale(0.8)
  transform-origin center left

.league
  white-space nowrap
</style>
