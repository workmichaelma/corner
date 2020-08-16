<template>
  <v-flex class="text-center">
    <div class="d-flex justify-center">
      <v-img :src="team.image" max-width="60" min-width="60" />
    </div>
    <div class="d-flex justify-center mt-2" :class="[`flex-row${isHome ? '' : '-reverse'}`]">
      <div>
        [{{ team.rank }}]
      </div>
      <div>
        {{ team.teamName }}
      </div>
    </div>
  </v-flex>  
</template>

<script>
export default {
  props: {
    team: {
      required: true,
      defualt: {}
    },
    isHome: {
      required: true,
      default: true
    }
  }
}
</script>