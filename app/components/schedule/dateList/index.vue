<template>
  <v-btn-toggle v-model="date" borderless dark>
    <template v-for="d in dateSet">
      <v-btn v-on:click="pickDate(d)" :key="d" :value="d">
        <span>{{ formatDate(d) }}</span>
      </v-btn>
    </template>
  </v-btn-toggle>
</template>

<script>
import moment from "moment";
import { head, get, isObject, map, orderBy } from "lodash";
export default {
  name: "schedule-datelist",
  data() {
    return {
      date: false
    };
  },
  computed: {
    data() {
      return get(this, "$store.state.header.scheduleData.data", {});
    },
    datePicked() {
      return get(this, "$store.state.header.scheduleData.datePicked", "");
    },
    dateSet() {
      return orderBy(
        Object.keys(this.data),
        d => moment(d, "DDMM"),
        this.isFuture ? "asc" : "desc"
      );
    },
    isFuture() {
      return this.$route.path === "/";
    }
  },
  methods: {
    pickDate(d) {
      this.$store.dispatch("header/setScheduleData", {
        datePicked: d
      });
    },
    formatDate(d) {
      return moment(d, "DDMM").format("DD");
    }
  },
  watch: {
    datePicked: {
      handler: function() {
        this.date = this.datePicked;
      },
      immediate: true
    },
    dateSet: {
      handler: function() {
        this.pickDate(head(this.dateSet));
      },
      immediate: true
    }
  }
};
</script>

<style></style>
