<template>
  <v-app-bar dense dark fixed>
    <v-flex class="d-flex">
      <!-- <v-flex class="d-flex justify-center align-center flex-grow-0">
        <v-btn text small class="pa-0">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-flex> -->
      <v-flex class="d-flex justify-center" v-if="isSchedule">
        <schedule-date-list v-if="showScheduleDateList" />
      </v-flex>
      <v-flex class="d-flex justify-center" v-if="isMatch">
        <matches-bar v-bind="{ currentMatchId }" />
      </v-flex>
    </v-flex>
  </v-app-bar>
</template>

<script>
import MatchesBar from "~/components/header/matchesBar.vue";
import ScheduleDateList from "~/components/header/dateList.vue";
export default {
  name: "app-header",
  components: {
    MatchesBar,
    ScheduleDateList
  },
  computed: {
    showScheduleDateList() {
      const path = this.$route.path;
      return path === "/" || path === "/ended-matches";
    },
    isSchedule() {
      const path = this.$route.path;
      return path === "/" || path === "/ended-matches";
    },
    isMatch() {
      const { name } = this.$route;
      return name === "match-id";
    },
    currentMatchId() {
      if (this.isMatch) {
        const { params } = this.$route;
        return params.id || null;
      }
      return null;
    }
  }
};
</script>

<style></style>
