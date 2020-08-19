<template>
  <v-flex class="d-flex flex-column caption justify-center">
    <v-flex class="d-flex align-end justify-center">
      <div class="date">{{ dateDiff }}</div>
      <v-icon size="10">mdi-calendar-check</v-icon>
    </v-flex>
    <v-flex class="d-flex align-center justify-center hha">
      {{ HHA }}
    </v-flex>
  </v-flex>  
</template>

<script>
export default {
  props: {
    dateDiff: {
      required: true,
      default: ''
    },
    HHA: {
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.date
  transform scale(0.85) translateY(5px)
.hha
  transform scale(0.75)
</style>