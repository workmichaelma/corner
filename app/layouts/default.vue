<template>
  <v-app dark>
    <v-main>
      <app-header />
      <v-container>
        <loading-overlay />
        <nuxt />
      </v-container>
      <app-footer />
    </v-main>
  </v-app>
</template>

<script>
import LoadingOverlay from "~/components/LoadingOverlay";
import Footer from "./footer";
import Header from "./header";

export default {
  components: {
    AppFooter: Footer,
    AppHeader: Header,
    LoadingOverlay
  }
};
</script>
