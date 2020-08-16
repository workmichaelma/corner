<template>
  <v-flex class="d-flex flex-column" v-if="match.ended && match.result">
    <had v-bind="{match}"/>
    <chl v-bind="{match}"/>
  </v-flex>
</template>
<script>
import HAD from './HAD'
import CHL from './CHL'
export default {
  components: {
    HAD,
    CHL
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  }  
}
</script>