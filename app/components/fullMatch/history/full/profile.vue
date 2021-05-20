<template>
  <div class="d-flex profile">
    <div class="px-1">
      {{ matchDate }}
    </div>
    <div class="px-1 league">
      {{ leagueName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "full-history-profile",
  props: {
    leagueName: {
      default: "",
      required: true
    },
    matchDate: {
      default: "",
      required: true
    }
  }
};
</script>

<style lang="stylus">
.profile
  align-self center
  height 0
  transform scale(0.8)
  transform-origin center left

.league
  white-space nowrap
</style>
