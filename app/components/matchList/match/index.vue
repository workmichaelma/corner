<template>
  <v-expansion-panel>
    <match-header v-bind="{ match }"/>
    <v-expansion-panel-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import Header from './header'
export default {
  components: {
    'match-header': Header
  },
  props: {
    id: {
      required: true,
      default: ''
    }
  },
  computed: {
    match () {
      return this.$store.state.match[this.id]
    }
  },
}
</script>
<style lang="stylus" scoped>

</style>