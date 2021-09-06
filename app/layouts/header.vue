<template>
  <v-app-bar dense dark fixed v-if="showHeader">
    <v-flex class="d-flex">
      <!-- <v-flex class="d-flex justify-center align-center flex-grow-0">
        <v-btn text small class="pa-0">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-flex> -->
      <v-flex class="d-flex justify-center">
        <schedule-date-list v-if="showScheduleDateList" />
      </v-flex>
    </v-flex>
  </v-app-bar>
</template>

<script>
import ScheduleDateList from "~/components/schedule/dateList/index.vue";
export default {
  name: "app-header",
  components: {
    ScheduleDateList
  },
  computed: {
    showScheduleDateList() {
      const path = this.$route.path;
      return path === "/" || path === "/ended-matches";
    },
    showHeader() {
      const path = this.$route.path;
      return path === "/" || path === "/ended-matches";
    }
  }
};
</script>

<style></style>
