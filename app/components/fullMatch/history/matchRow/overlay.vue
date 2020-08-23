<template>  
  <v-overlay
    absolute
    :value="show"
    opacity="0.9"
    v-if="show"
    class="overlay"
  >
    <v-card transparent>
      <v-flex class="d-flex align-center justify-center caption">
        <v-btn x-small class="ma-2" tile color="teal" icon @click="redirect()">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <div>
          前往比賽?
        </div>
        <v-btn x-small class="ma-2" tile color="teal" icon @click="toggleOverlay()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
  },
  methods: {
    redirect () {
      console.log(this.url)
      this.$router.push(this.url)
    }
  }
}
</script>

<style lang="stylus" scoped>
.overlay
  >>> .v-overlay__content
    width 100%
</style>