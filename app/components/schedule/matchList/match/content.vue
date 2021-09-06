<template>  
  <v-expansion-panel-content class="px-0">
    <v-flex class="d-flex">
      <v-flex class="col-10">
        買咩好？
      </v-flex>
      <v-flex class="col-2">
        <v-btn text class="pa-0" min-width="24" @click="redirect()">
          <v-icon>
            mdi-page-next-outline
          </v-icon>
        </v-btn>
      </v-flex>
    </v-flex>
  </v-expansion-panel-content>
</template>
<script>
export default {
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  methods: {
    redirect () {
      this.$router.push(`/match/${this.match.id}`)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>