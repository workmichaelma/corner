<template>
  <div>
    <full-match-header v-bind="{ match }" />
    <v-divider />
    <full-match-profile v-bind="{ match }" />
    <full-match-result v-bind="{match}" v-if="match.result" />
    <v-divider />
    <full-match-history v-bind="{match}" />
  </div>
</template>
<script>
import Header from './header/index'
import Profile from './profile'
import Result from './result/index'
import History from './history/index'
export default {
  components: {
    'full-match-header': Header,
    'full-match-profile': Profile,
    'full-match-result': Result,
    'full-match-history': History,
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