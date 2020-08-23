<template>
  <v-bottom-navigation
    dark
    fixed
    grow
    shift
  >
    <template v-for="item in items">
      <v-btn :key="item.title" @click="redirect(item.to)">
        <span>賽程</span>
        <v-icon :large="item.large">{{ item.icon }}</v-icon>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            icon: 'mdi-home-currency-usd',
            title: '賽程',
            to: '/',
            large: true
          },
          {
            icon: 'mdi-calendar-multiple-check',
            title: '賽果',
            to: '/ended-matches'
          },
          {
            icon: 'mdi-calendar-search',
            title: '搜尋賽事',
            to: '/search'
          },
        ],
      }
    },
    methods: {
      redirect (url) {
        this.$router.push(url)
      }
    }
  }
</script>