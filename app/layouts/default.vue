<template>
  <v-app dark>
    <v-main>
      <v-container class="pb-14 px-1">
        <nuxt />
      </v-container>
      <app-footer />
    </v-main>
  </v-app>
</template>

<script>
import Footer from './footer'

export default {
  components: {
    AppFooter: Footer
  }
}
</script>
