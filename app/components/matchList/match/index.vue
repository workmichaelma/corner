<template>
  <v-expansion-panel>
    <match-header v-bind="{ match }"/>
    <match-content v-bind="{ match }"/>
  </v-expansion-panel>
</template>
<script>
import Header from './header'
import Content from './content'
export default {
  components: {
    'match-header': Header,
    'match-content': Content,
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