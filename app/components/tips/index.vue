<template>
  <div>
    <tips-card
      v-for="(card, i) in matches"
      :key="i"
      v-bind="{
        card
      }"
    />
  </div>
</template>

<script>
import TipsCard from "./card.vue";
export default {
  name: "tips",
  components: {
    TipsCard
  },
  props: {
    matches: {
      default: [],
      required: true
    }
  }
};
</script>

<style lang="stylus" scoped></style>
