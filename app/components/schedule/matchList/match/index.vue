<template>
  <v-expansion-panel class="panel">
    <template v-if="match">
      <match-header v-bind="{ match }"/>
      <match-content v-bind="{ match }"/>
    </template>
    <template v-else>
      {{ id }}
    </template>
  </v-expansion-panel>
</template>
<script>
import Header from './header/index'
import Content from './content'
export default {
  components: {
    'match-header': Header,
    'match-content': Content,
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  computed: {
  },
}
</script>
<style lang="stylus" scoped>
.panel
  >>> button
    padding 0
</style>