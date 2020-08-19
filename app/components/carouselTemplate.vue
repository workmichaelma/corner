<template>
  <v-flex id="match__history" class="d-flex col-12 flex-column">
    <v-flex class="d-flex">
      <div class="col-6 caption pa-0">
        <v-btn tile v-on:click="to(0)">
          {{ match.homeTeam.teamName}}
        </v-btn>
      </div>
      <div class="d-flex col-6 caption pa-0 justify-end">
        <v-btn tile v-on:click="to(2)">
          {{ match.awayTeam.teamName}}
        </v-btn>
      </div>
    </v-flex>
    <v-flex class="d-fex">
    <v-carousel v-model="pages" hide-delimiters :show-arrows="false" :continuous="false" height="auto">
      <v-carousel-item
        v-for="page in ['home', 'all', 'away']"
        :key="page"
      >
      <component :is="page" v-bind="{match}" />
      </v-carousel-item>
    </v-carousel>
    </v-flex>
  </v-flex>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      pages: 1
    }
  },
  props: {
    match: {
      required: true,
      default: {}
    }
  },
  methods: {
    to (page) {
      this.pages = this.pages === page ? 1 : page
    }
  }
}
</script>
