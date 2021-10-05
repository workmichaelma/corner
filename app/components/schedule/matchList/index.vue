<template>
  <v-flex>
    <template v-for="(match, i) in matches">
      <v-divider :key="`schedulePage__match-dividers_${i}`" v-if="i > 0" />
      <match :key="`schedulePage__match_${i}`" v-bind="{ match }" />
    </template>
  </v-flex>
</template>

<script>
import Match from "./match/index";
export default {
  name: "match-list",
  components: {
    Match
  },
  props: {
    matches: {
      required: true,
      default: []
    }
  },
  computed: {}
};
</script>

<style lang="stylus" scoped></style>
