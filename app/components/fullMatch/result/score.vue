<template>
  <v-flex class="d-flex flex-column justify-space-between pt-0" v-if="match.ended && match.result">
    <v-flex class="d-flex justify-center align-center font-weight-bold text-h4">
      {{ `${match.result.FT.home} : ${match.result.FT.away}` }}
    </v-flex>
    <v-flex class="d-flex justify-center align-center caption">
      {{ `[ ${match.result.HT.home} : ${match.result.HT.away} ]` }}
    </v-flex>
    <v-flex class="d-flex align-center justify-center flex-grow-0" v-if="match.result.corner">
      {{ match.result.corner }}
      <v-icon right size="14" class="ml-0">mdi-flag-triangle</v-icon>
    </v-flex>
  </v-flex>  
</template>

<script>
export default {
  props: {
    match: {
      required: true,
      default: {}
    }
  }  
}
</script>