<template>
  <v-flex class="d-flex">
    <div class="col-6 pa-0">
      <v-btn tile v-on:click="to(0)">
        {{ home }}
      </v-btn>
    </div>
    <div class="d-flex col-6 pa-0 justify-end">
      <v-btn tile v-on:click="to(2)">
        {{ away }}
      </v-btn>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: "fullMatch-history-teamPicker",
  props: {
    home: {
      default: "",
      type: String
    },
    away: {
      default: "",
      type: String
    },
    to: {
      type: Function,
      required: true
    }
  }
};
</script>

<style></style>
