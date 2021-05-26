<template>
  <v-layout class="text-center">
    <v-flex class="side-per" xs2> {{ left1 }}</v-flex>
    <v-flex class="side" xs2>
      {{ left2 }}
    </v-flex>
    <v-flex class="mid" xs4>{{ mid }}</v-flex>
    <v-flex class="side" xs2>
      {{ right2 }}
    </v-flex>
    <v-flex class="side-per" xs2> {{ right1 }}</v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "full-match-stat-row",
  props: {
    left1: {
      required: true,
      default: ""
    },
    right1: {
      required: true,
      default: ""
    },
    left2: {
      required: false,
      default: ""
    },
    right2: {
      required: false,
      default: ""
    },
    mid: {
      required: true,
      default: ""
    }
  }
};
</script>

<style lang="stylus" scoped></style>
