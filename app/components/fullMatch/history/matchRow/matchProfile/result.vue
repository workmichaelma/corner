<template>
  <v-flex class="d-flex flex-column">
    <v-flex class="d-flex justify-center align-center">
      <p class="ft" :class="['home', color('home', homeId)]">
        {{ result.FT.home }}
      </p>
      <p>
        :
      </p>
      <p class="ft" :class="['away', color('away', awayId)]">
        {{ result.FT.away }}
      </p>
    </v-flex>
    <v-flex class="d-flex justify-center align-center ht">
      {{ `${result.HT.home} - ${ result.HT.away }` }}
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  name: 'history-matchrow-matchprofile-result',
  props: {
    result: {
      required: true,
      default: {}
    },
    color: {
      required: true,
      type: Function
    },
    homeId: {
      required: true,
      default: ''
    },
    awayId: {
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.ht
  transform scale(0.8)
p
  display inline
  margin 0
  letter-spacing 2px
  text-align center
  &:not(:nth-child(2))
    transform scale(1.2)
</style>