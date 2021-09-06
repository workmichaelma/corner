<template>
  <v-bottom-navigation
    dark
    dense
    fixed
    grow
    shift
    hide-on-scroll
    color="teal"
    v-model="active"
  >
    <template v-for="item in items">
      <v-btn :key="item.title" @click="redirect(item.to)">
        <span>{{ item.title }}</span>
        <v-icon :large="item.large">{{ item.icon }}</v-icon>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>

<script>
import { findIndex } from "lodash";
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-home-currency-usd",
          title: "賽程",
          to: "/"
        },
        {
          icon: "mdi-calendar-multiple-check",
          title: "賽果",
          to: "/ended-matches"
        },
        {
          icon: "mdi-calendar-search",
          title: "貼士",
          to: "/tips"
        },
        {
          icon: "mdi-video-image",
          title: "直播",
          to: "/live"
        }
      ],
      active: -1
    };
  },
  methods: {
    redirect(url) {
      this.$router.push(url);
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.active = findIndex(this.items, i => {
          return i.to === this.$route.path;
        });
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
