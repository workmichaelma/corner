<template>  
  <v-overlay
    absolute
    :value="show"
    opacity="0.9"
    v-if="show"
    class="overlay"
  >
    <v-card transparent>
      <v-flex class="d-flex">
        <v-flex class="col-1 offset-4 pa-0">
          <v-btn x-small class="ma-2" tile color="teal" icon :href="url">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="col-2 pa-0 d-flex align-center justify-center">
          前往比賽？
        </v-flex>
        <v-flex class="col-1 pa-0">
          <v-btn x-small class="ma-2" tile color="teal" icon @click="toggleOverlay()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  props: {
    show: {
      required: true,
      default: false
    },
    url: {
      required: true,
      default: ''
    },
    toggleOverlay: {
      required: true,
      type: Function
    }
  }
}
</script>

<style lang="stylus" scoped>
.overlay
  >>> .v-overlay__content
    width 100%
</style>