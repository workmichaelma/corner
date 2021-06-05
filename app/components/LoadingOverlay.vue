<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "loading-overlay",
  computed: {
    loading() {
      return this.$store.state.theme.loading || false;
    }
  }
};
</script>

<style></style>
